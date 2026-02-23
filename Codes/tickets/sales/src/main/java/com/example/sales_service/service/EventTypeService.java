package com.example.sales_service.service;

import com.example.sales_service.model.EventType;
import com.example.sales_service.repository.EventTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventTypeService {
    private final EventTypeRepository eventTypeRepository;

    public List<EventType> getAll() {
        return eventTypeRepository.findAll();
    }

    public EventType create(EventType eventType) {
        return eventTypeRepository.save(eventType);
    }

    public EventType getById(UUID id) {
        return eventTypeRepository.findById(id).orElseThrow(() -> new RuntimeException("EventType not found"));
    }
}
