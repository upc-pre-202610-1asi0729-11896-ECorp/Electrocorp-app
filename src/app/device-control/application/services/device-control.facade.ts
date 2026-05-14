import { DevicesApiEndpoint } from '../../infrastructure/api/devices-api-endpoint';
import { RoutinesApiEndpoint } from '../../infrastructure/api/routines-api-endpoint';
import { DeviceAssembler } from '../../infrastructure/assemblers/device.assembler';
import { RoutineAssembler } from '../../infrastructure/assemblers/routine.assembler';
import type { Device } from '../../domain/model/device.entity';
import type { Routine } from '../../domain/model/routine.entity';
import type { CreateDeviceDto } from '../dtos/create-device.dto';
import type { CreateRoutineDto } from '../dtos/create-routine.dto';
import type { UpdateDeviceStatusDto } from '../dtos/update-device-status.dto';

export class DeviceControlFacade {
    private readonly devicesApi = new DevicesApiEndpoint();
    private readonly routinesApi = new RoutinesApiEndpoint();

    async getDevices(): Promise<Device[]> {
        const responses = await this.devicesApi.findAll();

        return responses.map(DeviceAssembler.toEntity);
    }

    async createDevice(payload: CreateDeviceDto): Promise<Device> {
        const response = await this.devicesApi.create({
            name: payload.name,
            room: payload.room,
            type: payload.type,
            powerWatts: payload.powerWatts,
        });

        return DeviceAssembler.toEntity(response);
    }

    async updateDeviceStatus(payload: UpdateDeviceStatusDto): Promise<Device | null> {
        const response = await this.devicesApi.updateStatus(
            payload.deviceId,
            payload.status
        );

        if (!response) return null;

        return DeviceAssembler.toEntity(response);
    }

    async deleteDevice(deviceId: number): Promise<void> {
        await this.devicesApi.delete(deviceId);
    }

    async getRoutines(): Promise<Routine[]> {
        const responses = await this.routinesApi.findAll();

        return responses.map(RoutineAssembler.toEntity);
    }

    async createRoutine(payload: CreateRoutineDto): Promise<Routine> {
        const response = await this.routinesApi.create({
            name: payload.name,
            deviceId: payload.deviceId,
            action: payload.action,
            scheduledTime: payload.scheduledTime,
            enabled: true,
        });

        return RoutineAssembler.toEntity(response);
    }

    async updateRoutineEnabled(
        routineId: number,
        enabled: boolean
    ): Promise<Routine | null> {
        const response = await this.routinesApi.updateEnabled(routineId, enabled);

        if (!response) return null;

        return RoutineAssembler.toEntity(response);
    }

    async deleteRoutine(routineId: number): Promise<void> {
        await this.routinesApi.delete(routineId);
    }
}