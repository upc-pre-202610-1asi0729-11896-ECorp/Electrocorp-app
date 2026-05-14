package com.electrocorp.domain.device.valueobject;

import com.electrocorp.domain.shared.DomainException;

public class DeviceCode {
    private final String value;

    public DeviceCode(String value) {
        if (value == null || value.isBlank()) {
            throw new DomainException("El código del dispositivo es obligatorio.");
        }
        this.value = value.trim();
    }

    public String getValue() {
        return value;
    }
}