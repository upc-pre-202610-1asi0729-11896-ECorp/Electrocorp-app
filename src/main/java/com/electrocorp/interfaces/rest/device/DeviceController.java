package com.electrocorp.interfaces.rest.device;

import com.electrocorp.application.device.command.PairDeviceCommand;
import com.electrocorp.application.device.command.RenameDeviceCommand;
import com.electrocorp.application.device.command.ScheduleDeviceCommand;
import com.electrocorp.application.device.command.TurnOffDeviceCommand;
import com.electrocorp.application.device.command.TurnOnDeviceCommand;
import com.electrocorp.application.device.dto.DeviceRequest;
import com.electrocorp.application.device.dto.DeviceResponse;
import com.electrocorp.application.device.dto.DeviceScheduleRequest;
import com.electrocorp.application.device.service.*;
import com.electrocorp.domain.device.model.Device;
import com.electrocorp.domain.device.valueobject.DeviceType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    private final PairDeviceUseCase pairDeviceUseCase;
    private final TurnOnDeviceUseCase turnOnDeviceUseCase;
    private final TurnOffDeviceUseCase turnOffDeviceUseCase;
    private final GetDevicesUseCase getDevicesUseCase;
    private final RenameDeviceUseCase renameDeviceUseCase;
    private final ScheduleDeviceUseCase scheduleDeviceUseCase;
    private final DeleteDeviceUseCase deleteDeviceUseCase;

    public DeviceController(
            PairDeviceUseCase pairDeviceUseCase,
            TurnOnDeviceUseCase turnOnDeviceUseCase,
            TurnOffDeviceUseCase turnOffDeviceUseCase,
            GetDevicesUseCase getDevicesUseCase,
            RenameDeviceUseCase renameDeviceUseCase,
            ScheduleDeviceUseCase scheduleDeviceUseCase,
            DeleteDeviceUseCase deleteDeviceUseCase
    ) {
        this.pairDeviceUseCase = pairDeviceUseCase;
        this.turnOnDeviceUseCase = turnOnDeviceUseCase;
        this.turnOffDeviceUseCase = turnOffDeviceUseCase;
        this.getDevicesUseCase = getDevicesUseCase;
        this.renameDeviceUseCase = renameDeviceUseCase;
        this.scheduleDeviceUseCase = scheduleDeviceUseCase;
        this.deleteDeviceUseCase = deleteDeviceUseCase;
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
        return getDevicesUseCase.execute().stream().map(this::toResponse).toList();
    }

    @PutMapping("/{deviceId}/turn-on")
    public void turnOn(@PathVariable UUID deviceId) {
        turnOnDeviceUseCase.execute(new TurnOnDeviceCommand(deviceId, UUID.randomUUID()));
    }

    @PutMapping("/{deviceId}/turn-off")
    public void turnOff(@PathVariable UUID deviceId) {
        turnOffDeviceUseCase.execute(new TurnOffDeviceCommand(deviceId, UUID.randomUUID()));
    }

    @PutMapping("/{deviceId}/rename")
    public DeviceResponse rename(@PathVariable UUID deviceId, @RequestBody DeviceRequest request) {
        Device device = renameDeviceUseCase.execute(new RenameDeviceCommand(deviceId, request.name));
        return toResponse(device);
    }

    @PostMapping("/{deviceId}/schedule")
    public DeviceResponse schedule(@PathVariable UUID deviceId, @RequestBody DeviceScheduleRequest request) {
        Device device = scheduleDeviceUseCase.execute(
                new ScheduleDeviceCommand(deviceId, LocalTime.parse(request.executeAt), request.turnOn)
        );
        return toResponse(device);
    }

    @DeleteMapping("/{deviceId}")
    public void delete(@PathVariable UUID deviceId) {
        deleteDeviceUseCase.execute(deviceId);
    }

    private DeviceResponse toResponse(Device device) {
        DeviceResponse response = new DeviceResponse();
        response.id = device.getId();
        response.name = device.getName().getValue();
        response.code = device.getCode().getValue();
        response.type = device.getType().name();
        response.status = device.getStatus().name();
        response.ownerId = device.getOwnerId();
        response.schedules = device.getSchedules().stream().map(schedule -> {
            var s = new com.electrocorp.application.device.dto.DeviceScheduleResponse();
            s.executeAt = schedule.getExecuteAt().toString();
            s.turnOn = schedule.isTurnOn();
            return s;
        }).toList();
        return response;
    }
}