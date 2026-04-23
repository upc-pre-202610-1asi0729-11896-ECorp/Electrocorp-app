package com.electrocorp.domain.shared;

import java.util.Objects;
import java.util.UUID;

public class Identifier {
    private final UUID value;

    public Identifier(UUID value) {
        this.value = Objects.requireNonNull(value);
    }

    public UUID getValue() {
        return value;
    }
}