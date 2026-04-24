package com.electrocorp.infrastructure.persistence.jpa;

import com.electrocorp.domain.energy.model.EnergyReading;
import com.electrocorp.domain.energy.repository.EnergyReadingRepository;
import com.electrocorp.domain.energy.valueobject.EnergyAmount;

import java.util.List;
import java.util.UUID;

public class JpaEnergyReadingRepositoryAdapter implements EnergyReadingRepository {

    private final EnergyReadingJpaRepository energyReadingJpaRepository;

    public JpaEnergyReadingRepositoryAdapter(EnergyReadingJpaRepository energyReadingJpaRepository) {
        this.energyReadingJpaRepository = energyReadingJpaRepository;
    }

    @Override
    public EnergyReading save(EnergyReading reading) {
        EnergyReadingEntity entity = new EnergyReadingEntity(
                reading.getId(),
                reading.getDeviceId(),
                reading.getAmount().getValue(),
                reading.getRecordedAt()
        );

        EnergyReadingEntity saved = energyReadingJpaRepository.save(entity);
        return toDomain(saved);
    }

    @Override
    public List<EnergyReading> findAll() {
        return energyReadingJpaRepository.findAll().stream()
                .map(this::toDomain)
                .toList();
    }

    @Override
    public List<EnergyReading> findByDeviceId(UUID deviceId) {
        return energyReadingJpaRepository.findByDeviceId(deviceId).stream()
                .map(this::toDomain)
                .toList();
    }

    private EnergyReading toDomain(EnergyReadingEntity entity) {
        return new EnergyReading(
                entity.getId(),
                entity.getDeviceId(),
                new EnergyAmount(entity.getAmount()),
                entity.getRecordedAt()
        );
    }
}