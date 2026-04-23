package com.electrocorp.domain.energy.model;

import com.electrocorp.domain.energy.valueobject.EnergyAmount;

import java.time.LocalDateTime;
import java.util.UUID;

public class EnergyReading {
    private UUID id;
    private UUID deviceId;
    private EnergyAmount amount;
    private LocalDateTime recordedAt;

    public EnergyReading(UUID deviceId, EnergyAmount amount) {
        this.id = UUID.randomUUID();
        this.deviceId = deviceId;
        this.amount = amount;
        this.recordedAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public UUID getDeviceId() {
        return deviceId;
    }

    public EnergyAmount getAmount() {
        return amount;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }
}