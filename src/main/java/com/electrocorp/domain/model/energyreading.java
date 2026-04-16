package com.electrocorp.domain.model;

import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class energyreading {

    private String homeId;
    private double kwh;
    private double costPerKwh;
    private LocalDateTime timestamp;

    public energyreading(String homeId, double kwh, double costPerKwh) {
        this.homeId = homeId;
        this.kwh = kwh;
        this.costPerKwh = costPerKwh;
        this.timestamp = LocalDateTime.now();
    }

    public double totalCost() {
        return kwh * costPerKwh;
    }
}