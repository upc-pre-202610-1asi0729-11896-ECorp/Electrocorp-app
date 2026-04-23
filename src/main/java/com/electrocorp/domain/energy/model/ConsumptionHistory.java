package com.electrocorp.domain.energy.model;

import com.electrocorp.domain.energy.valueobject.EnergyAmount;

public class ConsumptionHistory {
    private final String label;
    private final EnergyAmount amount;

    public ConsumptionHistory(String label, EnergyAmount amount) {
        this.label = label;
        this.amount = amount;
    }

    public String getLabel() {
        return label;
    }

    public EnergyAmount getAmount() {
        return amount;
    }
}