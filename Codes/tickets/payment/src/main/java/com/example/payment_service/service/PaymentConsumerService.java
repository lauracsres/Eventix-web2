package com.example.payment_service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentConsumerService {

    @Value("${sales-service.url}")
    private String salesServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @KafkaListener(topics = "sales-topic", groupId = "payment-group")
    public void consume(String saleId) {
        System.out.println("Received sale for processing: " + saleId);
        
        try {
            // Simulate processing time
            Thread.sleep(5000);
            
            // Random logic for failure simulation (20% chance of failure)
            boolean success = Math.random() > 0.2;
            String status = success ? "PAGO" : "EM_ABERTO";
            
            String url = salesServiceUrl + "/api/sales/" + saleId + "/status";
            
            Map<String, String> body = new HashMap<>();
            body.put("saleStatus", status);
            
            restTemplate.put(url, body);
            
            if (success) {
                System.out.println("Sale " + saleId + " PROCESSED and updated to PAGO");
            } else {
                System.out.println("Sale " + saleId + " payment attempt FAILED. Status remains EM_ABERTO");
            }
            
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            System.err.println("Error processing payment for sale " + saleId + ": " + e.getMessage());
        }
    }
}
