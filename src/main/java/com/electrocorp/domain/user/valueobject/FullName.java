package com.electrocorp.domain.user.valueobject;

import com.electrocorp.domain.shared.DomainException;

public class FullName {
    private final String value;

    public FullName(String value) {
        if (value == null || value.isBlank()) {
            throw new DomainException("El nombre completo es obligatorio.");
        }
        this.value = value.trim();
    }

    public String getValue() {
        return value;
    }
}