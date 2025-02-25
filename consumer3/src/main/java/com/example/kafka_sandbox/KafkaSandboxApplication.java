package com.example.kafka_sandbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@EnableKafka
public class KafkaSandboxApplication {

	public static void main(String[] args) {
		SpringApplication.run(KafkaSandboxApplication.class, args);
	}

}
