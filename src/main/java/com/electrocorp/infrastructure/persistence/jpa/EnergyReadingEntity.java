package com.electrocorp.infrastructure.persistence.jpa;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "energy_readings")
public class EnergyReadingEntity {

    @Id
    private UUID id;

    @Column(nullable = false)
    private UUID deviceId;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private LocalDateTime recordedAt;

    public EnergyReadingEntity() {
    }

    public EnergyReadingEntity(UUID id, UUID deviceId, double amount, LocalDateTime recordedAt) {
        this.id = id;
        this.deviceId = deviceId;
        this.amount = amount;
        this.recordedAt = recordedAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(UUID deviceId) {
        this.deviceId = deviceId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(LocalDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }
}