package com.electrocorp.application.device.service;

import com.electrocorp.application.device.command.TurnOffDeviceCommand;
import com.electrocorp.domain.device.model.Device;
import com.electrocorp.domain.device.repository.DeviceRepository;
import com.electrocorp.domain.shared.DomainException;
import org.springframework.stereotype.Service;

@Service
public class TurnOffDeviceUseCase {

    private final DeviceRepository deviceRepository;

    public TurnOffDeviceUseCase(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public void execute(TurnOffDeviceCommand command) {
        Device device = deviceRepository.findById(command.deviceId())
                .orElseThrow(() -> new DomainException("Dispositivo no encontrado"));

        device.turnOff(command.performedBy());
        deviceRepository.save(device);
    }
}