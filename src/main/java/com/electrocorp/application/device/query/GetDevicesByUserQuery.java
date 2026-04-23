package com.electrocorp.application.device.query;

import java.util.UUID;

public record GetDevicesByUserQuery(UUID ownerId) {
}