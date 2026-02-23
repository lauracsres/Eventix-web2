package com.example.sales_service.service;

import com.example.sales_service.dto.EventDTO;
import com.example.sales_service.exception.ResourceNotFoundException;
import com.example.sales_service.model.Event;
import com.example.sales_service.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final EventTypeService eventTypeService;

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public EventDTO createEvent(EventDTO dto) {
        Event event = toEntity(dto);
        Event saved = eventRepository.save(event);
        return toDTO(saved);
    }

    public EventDTO getEventById(UUID id) {
        return eventRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
    }

    private EventDTO toDTO(Event event) {
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setDescription(event.getDescription());
        dto.setEventTypeId(event.getEventType().getId());
        dto.setEventTypeName(event.getEventType().getName());
        dto.setDate(event.getDate());
        dto.setStartSales(event.getStartSales());
        dto.setEndSales(event.getEndSales());
        dto.setPrice(event.getPrice());
        return dto;
    }

    private Event toEntity(EventDTO dto) {
        return Event.builder()
                .description(dto.getDescription())
                .eventType(eventTypeService.getById(dto.getEventTypeId()))
                .date(dto.getDate())
                .startSales(dto.getStartSales())
                .endSales(dto.getEndSales())
                .price(dto.getPrice())
                .build();
    }
}
