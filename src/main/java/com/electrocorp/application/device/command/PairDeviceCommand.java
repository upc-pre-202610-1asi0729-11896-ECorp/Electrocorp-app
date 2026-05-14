package com.electrocorp.application.device.command;

import com.electrocorp.domain.device.valueobject.DeviceType;

import java.util.UUID;

public record PairDeviceCommand(
        UUID ownerId,
        String name,
        String code,
        DeviceType type
) {
}