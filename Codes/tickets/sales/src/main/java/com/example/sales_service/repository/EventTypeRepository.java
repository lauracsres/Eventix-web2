package com.example.sales_service.repository;

import com.example.sales_service.model.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EventTypeRepository extends JpaRepository<EventType, UUID> {
}
