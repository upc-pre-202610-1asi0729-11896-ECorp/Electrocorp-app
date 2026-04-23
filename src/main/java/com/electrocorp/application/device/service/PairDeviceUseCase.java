package com.electrocorp.application.device.service;

import com.electrocorp.application.device.command.PairDeviceCommand;
import com.electrocorp.domain.device.model.Device;
import com.electrocorp.domain.device.repository.DeviceRepository;
import com.electrocorp.domain.device.valueobject.DeviceCode;
import com.electrocorp.domain.device.valueobject.DeviceName;
import org.springframework.stereotype.Service;

@Service
public class PairDeviceUseCase {

    private final DeviceRepository deviceRepository;

    public PairDeviceUseCase(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public Device execute(PairDeviceCommand command) {
        Device device = new Device(
                command.ownerId(),
                new DeviceName(command.name()),
                new DeviceCode(command.code()),
                command.type()
        );

        return deviceRepository.save(device);
    }
}