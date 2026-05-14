package com.electrocorp.application.device.service;

import com.electrocorp.application.device.command.ScheduleDeviceCommand;
import com.electrocorp.domain.device.model.Device;
import com.electrocorp.domain.device.model.DeviceSchedule;
import com.electrocorp.domain.device.repository.DeviceRepository;
import com.electrocorp.domain.shared.DomainException;
import org.springframework.stereotype.Service;

@Service
public class ScheduleDeviceUseCase {

    private final DeviceRepository deviceRepository;

    public ScheduleDeviceUseCase(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public Device execute(ScheduleDeviceCommand command) {
        Device device = deviceRepository.findById(command.deviceId())
                .orElseThrow(() -> new DomainException("Dispositivo no encontrado"));

        device.addSchedule(new DeviceSchedule(command.executeAt(), command.turnOn()));
        return deviceRepository.save(device);
    }
}