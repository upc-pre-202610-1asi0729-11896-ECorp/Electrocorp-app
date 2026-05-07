import { API_BASE_URL } from '../../../shared/infrastructure/api/api-config';
import type { DeviceResponse } from '../responses/device.response';
import type { DeviceResource } from '../resources/device.resource';

export class DevicesApiEndpoint {
    async findAll(): Promise<DeviceResponse[]> {
        const response = await fetch(`${API_BASE_URL}/devices`);

        if (!response.ok) {
            throw new Error('Error loading devices.');
        }

        return response.json();
    }

    async create(resource: DeviceResource): Promise<DeviceResponse> {
        const response = await fetch(`${API_BASE_URL}/devices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Date.now(),
                ...resource,
                status: 'OFF',
            }),
        });

        if (!response.ok) {
            throw new Error('Error creating device.');
        }

        return response.json();
    }

    async updateStatus(
        deviceId: number,
        status: DeviceResponse['status']
    ): Promise<DeviceResponse | null> {
        const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async delete(deviceId: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error deleting device.');
        }
    }
}