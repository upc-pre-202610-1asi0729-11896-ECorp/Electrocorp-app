package com.electrocorp.domain.device.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class DeviceActivity {
    private UUID id;
    private UUID performedBy;
    private String action;
    private LocalDateTime occurredAt;

    public DeviceActivity(UUID performedBy, String action) {
        this.id = UUID.randomUUID();
        this.performedBy = performedBy;
        this.action = action;
        this.occurredAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public UUID getPerformedBy() {
        return performedBy;
    }

    public String getAction() {
        return action;
    }

    public LocalDateTime getOccurredAt() {
        return occurredAt;
    }
}