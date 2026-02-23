package com.example.sales_service.controller;

import com.example.sales_service.dto.EventDTO;
import com.example.sales_service.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping
    public List<EventDTO> getAll() {
        return eventService.getAllEvents();
    }

    @PostMapping
    public ResponseEntity<EventDTO> create(@RequestBody @Valid EventDTO dto) {
        return ResponseEntity.ok(eventService.createEvent(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }
}
