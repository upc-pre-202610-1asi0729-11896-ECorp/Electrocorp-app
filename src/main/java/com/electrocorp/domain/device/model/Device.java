package com.electrocorp.domain.device.model;

import com.electrocorp.domain.device.valueobject.DeviceCode;
import com.electrocorp.domain.device.valueobject.DeviceName;
import com.electrocorp.domain.device.valueobject.DeviceStatus;
import com.electrocorp.domain.device.valueobject.DeviceType;
import com.electrocorp.domain.shared.AggregateRoot;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Device extends AggregateRoot {

    private UUID ownerId;
    private DeviceName name;
    private DeviceCode code;
    private DeviceType type;
    private DeviceStatus status;
    private final List<DeviceSchedule> schedules;
    private final List<DeviceActivity> activities;

    public Device(UUID ownerId, DeviceName name, DeviceCode code, DeviceType type) {
        this.id = UUID.randomUUID();
        this.ownerId = ownerId;
        this.name = name;
        this.code = code;
        this.type = type;
        this.status = DeviceStatus.OFF;
        this.schedules = new ArrayList<>();
        this.activities = new ArrayList<>();
    }

    public Device(UUID id, UUID ownerId, DeviceName name, DeviceCode code, DeviceType type, DeviceStatus status) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.code = code;
        this.type = type;
        this.status = status;
        this.schedules = new ArrayList<>();
        this.activities = new ArrayList<>();
    }

    public void rename(DeviceName newName) {
        this.name = newName;
    }

    public void turnOn(UUID performedBy) {
        if (this.status != DeviceStatus.ON) {
            this.status = DeviceStatus.ON;
            this.activities.add(new DeviceActivity(performedBy, "TURN_ON"));
        }
    }

    public void turnOff(UUID performedBy) {
        if (this.status != DeviceStatus.OFF) {
            this.status = DeviceStatus.OFF;
            this.activities.add(new DeviceActivity(performedBy, "TURN_OFF"));
        }
    }

    public void addSchedule(DeviceSchedule schedule) {
        this.schedules.add(schedule);
    }

    public UUID getOwnerId() {
        return ownerId;
    }

    public DeviceName getName() {
        return name;
    }

    public DeviceCode getCode() {
        return code;
    }

    public DeviceType getType() {
        return type;
    }

    public DeviceStatus getStatus() {
        return status;
    }

    public List<DeviceSchedule> getSchedules() {
        return List.copyOf(schedules);
    }

    public List<DeviceActivity> getActivities() {
        return List.copyOf(activities);
    }
}