package com.electrocorp.application.usecase;

import com.electrocorp.domain.model.device;
import com.electrocorp.domain.model.home;

public class turndeviceusecase {

    public device execute(home home, String deviceId, boolean turnOn) {

        device device = home.getDevice(deviceId);

        if (device == null) {
            throw new RuntimeException("Device not found");
        }

        if (turnOn) device.turnOn();
        else device.turnOff();

        return device;
    }
}