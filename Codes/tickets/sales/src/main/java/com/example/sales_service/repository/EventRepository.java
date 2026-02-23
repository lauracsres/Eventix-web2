package com.example.sales_service.repository;

import com.example.sales_service.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
}
