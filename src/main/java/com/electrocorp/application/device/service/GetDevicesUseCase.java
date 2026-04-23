package com.electrocorp.application.device.service;

import com.electrocorp.domain.device.model.Device;
import com.electrocorp.domain.device.repository.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetDevicesUseCase {

    private final DeviceRepository deviceRepository;

    public GetDevicesUseCase(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public List<Device> execute() {
        return deviceRepository.findAll();
    }
}