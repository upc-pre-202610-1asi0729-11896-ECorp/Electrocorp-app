package com.electrocorp.infrastructure.persistence.jpa;

import com.electrocorp.domain.energy.model.EnergyReading;
import com.electrocorp.domain.energy.repository.EnergyReadingRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class InMemoryEnergyReadingRepository implements EnergyReadingRepository {

    private final List<EnergyReading> storage = new ArrayList<>();

    @Override
    public EnergyReading save(EnergyReading reading) {
        storage.add(reading);
        return reading;
    }

    @Override
    public List<EnergyReading> findAll() {
        return new ArrayList<>(storage);
    }

    @Override
    public List<EnergyReading> findByDeviceId(UUID deviceId) {
        return storage.stream()
                .filter(r -> r.getDeviceId().equals(deviceId))
                .toList();
    }
}