package com.electrocorp.domain.device.model;

import java.time.LocalTime;
import java.util.UUID;

public class DeviceSchedule {
    private UUID id;
    private LocalTime executeAt;
    private boolean turnOn;

    public DeviceSchedule(LocalTime executeAt, boolean turnOn) {
        this.id = UUID.randomUUID();
        this.executeAt = executeAt;
        this.turnOn = turnOn;
    }

    public UUID getId() {
        return id;
    }

    public LocalTime getExecuteAt() {
        return executeAt;
    }

    public boolean isTurnOn() {
        return turnOn;
    }
}