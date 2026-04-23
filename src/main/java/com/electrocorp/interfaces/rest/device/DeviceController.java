package com.electrocorp.interfaces.rest.device;

import com.electrocorp.application.device.command.PairDeviceCommand;
import com.electrocorp.application.device.command.TurnOffDeviceCommand;
import com.electrocorp.application.device.command.TurnOnDeviceCommand;
import com.electrocorp.application.device.dto.DeviceRequest;
import com.electrocorp.application.device.dto.DeviceResponse;
import com.electrocorp.application.device.service.GetDevicesUseCase;
import com.electrocorp.application.device.service.PairDeviceUseCase;
import com.electrocorp.application.device.service.TurnOffDeviceUseCase;
import com.electrocorp.application.device.service.TurnOnDeviceUseCase;
import com.electrocorp.domain.device.model.Device;
import com.electrocorp.domain.device.valueobject.DeviceType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    private final PairDeviceUseCase pairDeviceUseCase;
    private final TurnOnDeviceUseCase turnOnDeviceUseCase;
    private final TurnOffDeviceUseCase turnOffDeviceUseCase;
    private final GetDevicesUseCase getDevicesUseCase;

    public DeviceController(
            PairDeviceUseCase pairDeviceUseCase,
            TurnOnDeviceUseCase turnOnDeviceUseCase,
            TurnOffDeviceUseCase turnOffDeviceUseCase,
            GetDevicesUseCase getDevicesUseCase
    ) {
        this.pairDeviceUseCase = pairDeviceUseCase;
        this.turnOnDeviceUseCase = turnOnDeviceUseCase;
        this.turnOffDeviceUseCase = turnOffDeviceUseCase;
        this.getDevicesUseCase = getDevicesUseCase;
    }

    @PostMapping
    public DeviceResponse pairDevice(@RequestBody DeviceRequest request) {
        Device device = pairDeviceUseCase.execute(
                new PairDeviceCommand(
                        UUID.fromString(request.ownerId),
                        request.name,
                        request.code,
                        DeviceType.valueOf(request.type)
                )
        );

        return toResponse(device);
    }

    @GetMapping
    public List<DeviceResponse> getAllDevices() {
        return getDevicesUseCase.execute().stream()
                .map(this::toResponse)
                .toList();
    }

    @PutMapping("/{deviceId}/turn-on")
    public void turnOn(@PathVariable UUID deviceId) {
        turnOnDeviceUseCase.execute(new TurnOnDeviceCommand(deviceId, UUID.randomUUID()));
    }

    @PutMapping("/{deviceId}/turn-off")
    public void turnOff(@PathVariable UUID deviceId) {
        turnOffDeviceUseCase.execute(new TurnOffDeviceCommand(deviceId, UUID.randomUUID()));
    }

    private DeviceResponse toResponse(Device device) {
        DeviceResponse response = new DeviceResponse();
        response.id = device.getId();
        response.name = device.getName().getValue();
        response.code = device.getCode().getValue();
        response.type = device.getType().name();
        response.status = device.getStatus().name();
        response.ownerId = device.getOwnerId();
        return response;
    }
}