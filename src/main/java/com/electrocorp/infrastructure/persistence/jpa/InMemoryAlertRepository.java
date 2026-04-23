package com.electrocorp.infrastructure.persistence.jpa;

import com.electrocorp.domain.alert.model.Alert;
import com.electrocorp.domain.alert.repository.AlertRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class InMemoryAlertRepository implements AlertRepository {

    private final List<Alert> storage = new ArrayList<>();

    @Override
    public Alert save(Alert alert) {
        storage.add(alert);
        return alert;
    }

    @Override
    public List<Alert> findAll() {
        return new ArrayList<>(storage);
    }

    @Override
    public List<Alert> findByDeviceId(UUID deviceId) {
        return storage.stream()
                .filter(alert -> alert.getDeviceId().equals(deviceId))
                .toList();
    }
}