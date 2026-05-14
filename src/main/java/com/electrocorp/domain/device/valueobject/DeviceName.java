package com.electrocorp.domain.device.valueobject;

import com.electrocorp.domain.shared.DomainException;

public class DeviceName {
    private final String value;

    public DeviceName(String value) {
        if (value == null || value.isBlank()) {
            throw new DomainException("El nombre del dispositivo es obligatorio.");
        }
        if (value.trim().length() > 50) {
            throw new DomainException("El nombre del dispositivo no puede exceder 50 caracteres.");
        }
        this.value = value.trim();
    }

    public String getValue() {
        return value;
    }
}