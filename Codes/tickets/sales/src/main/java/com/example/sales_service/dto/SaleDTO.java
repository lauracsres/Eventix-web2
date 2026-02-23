package com.example.sales_service.dto;

import com.example.sales_service.model.SaleStatus;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class SaleDTO {
    private UUID id;
    private UUID userId;
    private EventDTO event;
    private LocalDateTime saleDate;
    private SaleStatus saleStatus;
}
