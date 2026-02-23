package com.example.sales_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class EventDTO {
    private UUID id;
    @NotBlank(message = "Description cannot be empty")
    private String description;
    @NotNull(message = "Type is required")
    private UUID eventTypeId;
    private String eventTypeName;
    @NotNull(message = "Date is required")
    private LocalDateTime date;
    @NotNull(message = "Start sales date is required")
    private LocalDateTime startSales;
    @NotNull(message = "End sales date is required")
    private LocalDateTime endSales;
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;
}
