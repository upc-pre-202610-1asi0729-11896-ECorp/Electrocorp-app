package com.electrocorp.application.device.command;

import java.util.UUID;

public record TurnOffDeviceCommand(UUID deviceId, UUID performedBy) {
}