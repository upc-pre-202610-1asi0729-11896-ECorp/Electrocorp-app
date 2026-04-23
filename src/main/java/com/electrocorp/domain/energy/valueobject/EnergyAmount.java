package com.electrocorp.domain.energy.valueobject;

import com.electrocorp.domain.shared.DomainException;

public class EnergyAmount {
    private final double value;

    public EnergyAmount(double value) {
        if (value < 0) {
            throw new DomainException("El consumo energético no puede ser negativo.");
        }
        this.value = value;
    }

    public double getValue() {
        return value;
    }
}