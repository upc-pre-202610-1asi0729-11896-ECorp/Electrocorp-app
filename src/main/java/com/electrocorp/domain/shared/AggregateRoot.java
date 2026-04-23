package com.electrocorp.domain.shared;

import java.util.UUID;

public abstract class AggregateRoot {
    protected UUID id;

    public UUID getId() {
        return id;
    }
}