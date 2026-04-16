package com.electrocorp.application.usecase;

import com.electrocorp.domain.model.energyreading;
import com.electrocorp.domain.repository.energyrepository;

public class addenergyreadingusecase {

    private final energyrepository repository;

    public addenergyreadingusecase(energyrepository repository) {
        this.repository = repository;
    }

    public energyreading execute(String homeId, double kwh, double costPerKwh) {
        energyreading reading = new energyreading(homeId, kwh, costPerKwh);
        repository.save(reading);
        return reading;
    }
}