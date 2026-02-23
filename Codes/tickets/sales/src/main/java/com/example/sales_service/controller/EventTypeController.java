package com.example.sales_service.controller;

import com.example.sales_service.model.EventType;
import com.example.sales_service.service.EventTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/event-types")
@RequiredArgsConstructor
public class EventTypeController {
    private final EventTypeService eventTypeService;

    @GetMapping
    public List<EventType> getAll() {
        return eventTypeService.getAll();
    }

    @PostMapping
    @ResponseBody
    public EventType create(@RequestBody EventType eventType) {
        return eventTypeService.create(eventType);
    }

    @GetMapping("/{id}")
    public EventType getById(@PathVariable UUID id) {
        return eventTypeService.getById(id);
    }
}
