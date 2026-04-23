package com.electrocorp.domain.device.repository;

import com.electrocorp.domain.device.model.Device;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DeviceRepository {
    Device save(Device device);
    Optional<Device> findById(UUID id);
    List<Device> findByOwnerId(UUID ownerId);
    List<Device> findAll();
}