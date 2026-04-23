package com.electrocorp.application.device.command;

import java.util.UUID;

public record RenameDeviceCommand(UUID deviceId, String newName) {
}