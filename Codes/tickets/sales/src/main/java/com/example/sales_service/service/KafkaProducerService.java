package com.example.sales_service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private static final String TOPIC = "sales-topic";

    public void sendSaleCreatedEvent(String saleId) {
        kafkaTemplate.send(TOPIC, saleId);
    }
}
