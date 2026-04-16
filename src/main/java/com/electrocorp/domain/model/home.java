package com.electrocorp.domain.model;

import lombok.Getter;
import java.util.*;

@Getter
public class home {

    private String id;
    private List<device> devices = new ArrayList<>();

    public home(String id) {
        this.id = id;
    }

    public void addDevice(device device) {
        devices.add(device);
    }

    public device getDevice(String deviceId) {
        return devices.stream()
                .filter(d -> d.getId().equals(deviceId)) // Lombok genera getId()
                .findFirst()
                .orElse(null);
    }
}