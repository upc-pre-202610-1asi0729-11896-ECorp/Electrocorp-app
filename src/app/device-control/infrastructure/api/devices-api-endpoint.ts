import type { DeviceResponse } from '../responses/device.response';
import type { DeviceResource } from '../resources/device.resource';

const STORAGE_KEY = 'ec.devices';

export class DevicesApiEndpoint {
    async findAll(): Promise<DeviceResponse[]> {
        const rawDevices = localStorage.getItem(STORAGE_KEY);

        if (!rawDevices) {
            return [];
        }

        return JSON.parse(rawDevices) as DeviceResponse[];
    }

    async create(resource: DeviceResource): Promise<DeviceResponse> {
        const devices = await this.findAll();

        const createdDevice: DeviceResponse = {
            id: Date.now(),
            ...resource,
        };

        const updatedDevices = [...devices, createdDevice];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDevices));

        return createdDevice;
    }

    async updateStatus(deviceId: number, status: DeviceResponse['status']): Promise<DeviceResponse | null> {
        const devices = await this.findAll();

        const updatedDevices = devices.map((device) =>
            device.id === deviceId ? { ...device, status } : device
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDevices));

        return updatedDevices.find((device) => device.id === deviceId) ?? null;
    }

    async delete(deviceId: number): Promise<void> {
        const devices = await this.findAll();
        const updatedDevices = devices.filter((device) => device.id !== deviceId);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDevices));
    }
}