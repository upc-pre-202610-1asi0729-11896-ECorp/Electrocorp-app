package com.electrocorp.domain.alert.model;

import java.util.UUID;

public class AlertRule {
    private UUID id;
    private UUID deviceId;
    private double threshold;

    public AlertRule(UUID deviceId, double threshold) {
        this.id = UUID.randomUUID();
        this.deviceId = deviceId;
        this.threshold = threshold;
    }

    public UUID getId() {
        return id;
    }

    public UUID getDeviceId() {
        return deviceId;
    }

    public double getThreshold() {
        return threshold;
    }
}