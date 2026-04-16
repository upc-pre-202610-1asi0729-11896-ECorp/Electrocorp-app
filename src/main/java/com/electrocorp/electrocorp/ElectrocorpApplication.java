package com.electrocorp.electrocorp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.electrocorp")
public class ElectrocorpApplication {

    public static void main(String[] args) {
        SpringApplication.run(ElectrocorpApplication.class, args);
    }
}
