package com.electrocorp.application.device.service;

import com.electrocorp.application.device.command.RenameDeviceCommand;
import com.electrocorp.domain.device.model.Device;
import com.electrocorp.domain.device.repository.DeviceRepository;
import com.electrocorp.domain.device.valueobject.DeviceName;
import com.electrocorp.domain.shared.DomainException;
import org.springframework.stereotype.Service;

@Service
public class RenameDeviceUseCase {

    private final DeviceRepository deviceRepository;

    public RenameDeviceUseCase(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public Device execute(RenameDeviceCommand command) {
        Device device = deviceRepository.findById(command.deviceId())
                .orElseThrow(() -> new DomainException("Dispositivo no encontrado"));

        device.rename(new DeviceName(command.newName()));
        return deviceRepository.save(device);
    }
}