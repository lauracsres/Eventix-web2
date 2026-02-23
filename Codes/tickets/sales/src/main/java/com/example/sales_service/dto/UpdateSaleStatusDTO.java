package com.example.sales_service.dto;

import com.example.sales_service.model.SaleStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateSaleStatusDTO {
    @NotNull(message = "Status is required")
    private SaleStatus saleStatus;
}
