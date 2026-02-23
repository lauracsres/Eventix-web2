package com.example.sales_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "event_type_id", nullable = false)
    private EventType eventType;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(name = "start_sales", nullable = false)
    private LocalDateTime startSales;

    @Column(name = "end_sales", nullable = false)
    private LocalDateTime endSales;

    @Column(nullable = false)
    private BigDecimal price;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
