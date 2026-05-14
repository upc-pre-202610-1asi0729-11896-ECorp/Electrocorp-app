package com.electrocorp.application.device.dto;

import java.util.List;
import java.util.UUID;

public class DeviceResponse {
    public UUID id;
    public String name;
    public String code;
    public String type;
    public String status;
    public UUID ownerId;
    public List<DeviceScheduleResponse> schedules;
}