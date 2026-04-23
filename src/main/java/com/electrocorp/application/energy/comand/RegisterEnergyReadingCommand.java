package com.electrocorp.application.energy.command;

import java.util.UUID;

public record RegisterEnergyReadingCommand(UUID deviceId, double amount) {
}