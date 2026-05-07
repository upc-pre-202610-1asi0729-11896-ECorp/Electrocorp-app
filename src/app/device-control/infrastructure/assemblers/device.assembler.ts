import { Device } from '../../domain/model/device.entity';
import type { DeviceResource } from '../resources/device.resource';
import type { DeviceResponse } from '../responses/device.response';

export class DeviceAssembler {
    static toEntity(response: DeviceResponse): Device {
        return new Device({
            id: response.id,
            name: response.name,
            room: response.room,
            type: response.type,
            status: response.status,
            powerWatts: response.powerWatts,
        });
    }

    static toResource(device: Device): DeviceResource {
        return {
            name: device.name,
            room: device.room,
            type: device.type,
            powerWatts: device.powerWatts,
        };
    }
}