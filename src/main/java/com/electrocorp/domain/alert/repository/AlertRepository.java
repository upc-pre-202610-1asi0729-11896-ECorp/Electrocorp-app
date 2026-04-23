package com.electrocorp.domain.alert.repository;

import com.electrocorp.domain.alert.model.Alert;

import java.util.List;
import java.util.UUID;

public interface AlertRepository {
    Alert save(Alert alert);
    List<Alert> findAll();
    List<Alert> findByDeviceId(UUID deviceId);
}