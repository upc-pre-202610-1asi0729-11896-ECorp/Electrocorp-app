import { DevicesApiEndpoint } from '../../infrastructure/api/devices-api-endpoint';
import { DeviceAssembler } from '../../infrastructure/assemblers/device.assembler';
import type { CreateDeviceDto } from '../dtos/create-device.dto';
import type { UpdateDeviceStatusDto } from '../dtos/update-device-status.dto';
import type { Device } from '../../domain/model/device.entity';

export class DeviceControlFacade {
    private readonly devicesApi = new DevicesApiEndpoint();

    async getDevices(): Promise<Device[]> {
        const responses = await this.devicesApi.findAll();

        return responses.map(DeviceAssembler.toEntity);
    }

    async createDevice(payload: CreateDeviceDto): Promise<Device> {
        const response = await this.devicesApi.create({
            name: payload.name,
            type: payload.type,
            status: 'OFF',
            room: payload.room,
            powerWatts: payload.powerWatts,
        });

        return DeviceAssembler.toEntity(response);
    }

    async updateDeviceStatus(payload: UpdateDeviceStatusDto): Promise<Device | null> {
        const response = await this.devicesApi.updateStatus(
            payload.deviceId,
            payload.status
        );

        if (!response) {
            return null;
        }

        return DeviceAssembler.toEntity(response);
    }

    async deleteDevice(deviceId: number): Promise<void> {
        await this.devicesApi.delete(deviceId);
    }
}