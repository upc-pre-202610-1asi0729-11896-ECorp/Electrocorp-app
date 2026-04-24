package com.electrocorp.application.device.service;

import com.electrocorp.domain.device.repository.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DeleteDeviceUseCase {

    private final DeviceRepository deviceRepository;

    public DeleteDeviceUseCase(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public void execute(UUID deviceId) {
        deviceRepository.deleteById(deviceId);
    }
}