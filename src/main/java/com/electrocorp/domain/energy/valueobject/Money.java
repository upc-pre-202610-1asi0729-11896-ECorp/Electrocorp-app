package com.electrocorp.domain.energy.valueobject;

import com.electrocorp.domain.shared.DomainException;

public class Money {
    private final double amount;

    public Money(double amount) {
        if (amount < 0) {
            throw new DomainException("El monto no puede ser negativo.");
        }
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }
}