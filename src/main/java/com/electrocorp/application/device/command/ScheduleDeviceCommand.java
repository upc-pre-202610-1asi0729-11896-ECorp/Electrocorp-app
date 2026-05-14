package com.electrocorp.application.device.command;

import java.time.LocalTime;
import java.util.UUID;

public record ScheduleDeviceCommand(UUID deviceId, LocalTime executeAt, boolean turnOn) {
}