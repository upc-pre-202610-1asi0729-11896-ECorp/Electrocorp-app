package com.electrocorp.application.device.service;

import com.electrocorp.application.device.command.TurnOnDeviceCommand;
import com.electrocorp.domain.device.model.Device;
import com.electrocorp.domain.device.repository.DeviceRepository;
import com.electrocorp.domain.shared.DomainException;
import org.springframework.stereotype.Service;

@Service
public class TurnOnDeviceUseCase {

    private final DeviceRepository deviceRepository;

    public TurnOnDeviceUseCase(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public void execute(TurnOnDeviceCommand command) {
        Device device = deviceRepository.findById(command.deviceId())
                .orElseThrow(() -> new DomainException("Dispositivo no encontrado"));

        device.turnOn(command.performedBy());
        deviceRepository.save(device);
    }
}