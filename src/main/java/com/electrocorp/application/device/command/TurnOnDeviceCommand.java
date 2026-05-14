package com.electrocorp.application.device.command;

import java.util.UUID;

public record TurnOnDeviceCommand(UUID deviceId, UUID performedBy) {
}