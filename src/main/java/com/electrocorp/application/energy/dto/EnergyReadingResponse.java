package com.electrocorp.application.energy.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class EnergyReadingResponse {
    public UUID id;
    public UUID deviceId;
    public double amount;
    public LocalDateTime recordedAt;
}