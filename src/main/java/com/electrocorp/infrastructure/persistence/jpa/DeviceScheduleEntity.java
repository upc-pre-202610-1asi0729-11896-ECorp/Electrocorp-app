package com.electrocorp.infrastructure.persistence.jpa;

import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "device_schedules")
public class DeviceScheduleEntity {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_id", nullable = false)
    private DeviceEntity device;

    @Column(nullable = false)
    private LocalTime executeAt;

    @Column(nullable = false)
    private boolean turnOn;

    public DeviceScheduleEntity() {
    }

    public DeviceScheduleEntity(UUID id, DeviceEntity device, LocalTime executeAt, boolean turnOn) {
        this.id = id;
        this.device = device;
        this.executeAt = executeAt;
        this.turnOn = turnOn;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public DeviceEntity getDevice() {
        return device;
    }

    public void setDevice(DeviceEntity device) {
        this.device = device;
    }

    public LocalTime getExecuteAt() {
        return executeAt;
    }

    public void setExecuteAt(LocalTime executeAt) {
        this.executeAt = executeAt;
    }

    public boolean isTurnOn() {
        return turnOn;
    }

    public void setTurnOn(boolean turnOn) {
        this.turnOn = turnOn;
    }
}