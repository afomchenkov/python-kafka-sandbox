package com.example.kafka_sandbox;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RestController {
    @Autowired
    private ResourceLoader resourceLoader;

    @GetMapping("/healthcheck")
    public ResponseEntity<Object> test() {
        return ResponseEntity.ok("running");
    }
}
