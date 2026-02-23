package com.example.sales_service.controller;

import com.example.sales_service.dto.CreateSaleDTO;
import com.example.sales_service.dto.SaleDTO;
import com.example.sales_service.dto.UpdateSaleStatusDTO;
import com.example.sales_service.service.SaleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SaleController {
    private final SaleService saleService;

    @GetMapping
    public List<SaleDTO> getAll() {
        return saleService.getAllSales();
    }

    @PostMapping
    public ResponseEntity<SaleDTO> create(@RequestBody @Valid CreateSaleDTO dto) {
        return ResponseEntity.ok(saleService.createSale(dto));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<SaleDTO> updateStatus(@PathVariable UUID id, @RequestBody @Valid UpdateSaleStatusDTO dto) {
        return ResponseEntity.ok(saleService.updateStatus(id, dto));
    }
}
