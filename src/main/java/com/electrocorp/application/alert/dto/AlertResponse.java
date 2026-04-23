package com.electrocorp.application.alert.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class AlertResponse {
    public UUID id;
    public UUID deviceId;
    public String message;
    public LocalDateTime createdAt;
}