package com.electrocorp.domain.energy.model;

public class EnergyRecommendation {
    private final String message;

    public EnergyRecommendation(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}