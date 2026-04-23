package com.electrocorp.domain.user.valueobject;

import com.electrocorp.domain.shared.DomainException;

public class Email {
    private final String value;

    public Email(String value) {
        if (value == null || value.isBlank() || !value.contains("@")) {
            throw new DomainException("Correo electrónico inválido.");
        }
        this.value = value.trim().toLowerCase();
    }

    public String getValue() {
        return value;
    }
}