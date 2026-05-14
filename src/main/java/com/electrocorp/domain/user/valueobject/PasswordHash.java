package com.electrocorp.domain.user.valueobject;

import com.electrocorp.domain.shared.DomainException;

public class PasswordHash {
    private final String value;

    public PasswordHash(String value) {
        if (value == null || value.isBlank()) {
            throw new DomainException("La contraseña es obligatoria.");
        }
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}