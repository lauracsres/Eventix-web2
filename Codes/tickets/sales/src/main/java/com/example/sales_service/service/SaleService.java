package com.example.sales_service.service;

import com.example.sales_service.dto.CreateSaleDTO;
import com.example.sales_service.dto.EventDTO;
import com.example.sales_service.dto.SaleDTO;
import com.example.sales_service.dto.UpdateSaleStatusDTO;
import com.example.sales_service.exception.ResourceNotFoundException;
import com.example.sales_service.model.Event;
import com.example.sales_service.model.Sale;
import com.example.sales_service.repository.EventRepository;
import com.example.sales_service.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SaleService {
    private final SaleRepository saleRepository;
    private final EventRepository eventRepository;
    private final KafkaProducerService kafkaProducerService;

    public List<SaleDTO> getAllSales() {
        return saleRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public SaleDTO createSale(CreateSaleDTO dto) {
        Event event = eventRepository.findById(dto.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        Sale sale = Sale.builder()
                .userId(dto.getUserId())
                .event(event)
                .saleStatus(dto.getSaleStatus())
                .build();

        Sale savedSale = saleRepository.save(sale);
        
        // Notify Kafka for payment processing
        try {
            kafkaProducerService.sendSaleCreatedEvent(savedSale.getId().toString());
        } catch (Exception e) {
            System.err.println("Error sending message to Kafka: " + e.getMessage());
        }
        
        return toDTO(savedSale);
    }

    public SaleDTO updateStatus(UUID id, UpdateSaleStatusDTO dto) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sale not found"));
        sale.setSaleStatus(dto.getSaleStatus());
        return toDTO(saleRepository.save(sale));
    }

    private SaleDTO toDTO(Sale sale) {
        SaleDTO dto = new SaleDTO();
        dto.setId(sale.getId());
        dto.setUserId(sale.getUserId());
        dto.setSaleDate(sale.getSaleDate());
        dto.setSaleStatus(sale.getSaleStatus());
        
        EventDTO eventDTO = new EventDTO();
        eventDTO.setId(sale.getEvent().getId());
        eventDTO.setDescription(sale.getEvent().getDescription());
        eventDTO.setPrice(sale.getEvent().getPrice());
        dto.setEvent(eventDTO);
        
        return dto;
    }
}
