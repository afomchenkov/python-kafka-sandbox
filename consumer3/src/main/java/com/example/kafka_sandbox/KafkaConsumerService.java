package com.example.kafka_sandbox;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "topic_test", groupId = "default-group")
    public void listen(ConsumerRecord<String, String> record) {
        System.out.println("Received message: " + record.value() + " from topic: " + record.topic());
    }
}