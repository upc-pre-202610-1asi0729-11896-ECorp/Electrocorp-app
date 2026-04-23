package com.electrocorp.infrastructure.persistence.jpa;

import com.electrocorp.domain.device.model.Device;
import com.electrocorp.domain.device.repository.DeviceRepository;

import java.util.*;

public class InMemoryDeviceRepository implements DeviceRepository {

    private final Map<UUID, Device> storage = new HashMap<>();

    @Override
    public Device save(Device device) {
        storage.put(device.getId(), device);
        return device;
    }

    @Override
    public Optional<Device> findById(UUID id) {
        return Optional.ofNullable(storage.get(id));
    }

    @Override
    public List<Device> findByOwnerId(UUID ownerId) {
        return storage.values().stream()
                .filter(device -> device.getOwnerId().equals(ownerId))
                .toList();
    }

    @Override
    public List<Device> findAll() {
        return new ArrayList<>(storage.values());
    }
}