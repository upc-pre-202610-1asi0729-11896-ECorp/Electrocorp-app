package com.electrocorp.domain.alert.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Alert {
    private UUID id;
    private UUID deviceId;
    private String message;
    private LocalDateTime createdAt;

    public Alert(UUID deviceId, String message) {
        this.id = UUID.randomUUID();
        this.deviceId = deviceId;
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public UUID getDeviceId() {
        return deviceId;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}