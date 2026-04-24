package com.electrocorp.infrastructure.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface EnergyReadingJpaRepository extends JpaRepository<EnergyReadingEntity, UUID> {
    List<EnergyReadingEntity> findByDeviceId(UUID deviceId);
}