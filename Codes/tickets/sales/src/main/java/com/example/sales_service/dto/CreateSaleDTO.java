package com.example.sales_service.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.UUID;
import com.example.sales_service.model.SaleStatus;

@Data
public class CreateSaleDTO {
    @NotNull(message = "User ID is required")
    private UUID userId;
    @NotNull(message = "Event ID is required")
    private UUID eventId;
    @NotNull(message = "Status is required")
    private SaleStatus saleStatus;
}
