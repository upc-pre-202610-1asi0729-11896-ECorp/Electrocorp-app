package com.electrocorp.domain.energy.repository;

import com.electrocorp.domain.energy.model.EnergyReading;

import java.util.List;
import java.util.UUID;

public interface EnergyReadingRepository {
    EnergyReading save(EnergyReading reading);
    List<EnergyReading> findAll();
    List<EnergyReading> findByDeviceId(UUID deviceId);
}