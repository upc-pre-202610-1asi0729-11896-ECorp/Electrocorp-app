import { Device } from '../../domain/model/device.entity';
import type { DeviceResponse } from '../responses/device.response';
import type { DeviceResource } from '../resources/device.resource';

export class DeviceAssembler {
    static toEntity(response: DeviceResponse): Device {
        return new Device({
            id: response.id,
            name: response.name,
            type: response.type,
            status: response.status,
            room: response.room,
            powerWatts: response.powerWatts,
        });
    }

    static toResource(device: Device): DeviceResource {
        return {
            name: device.name,
            type: device.type,
            status: device.status,
            room: device.room,
            powerWatts: device.powerWatts,
        };
    }
}