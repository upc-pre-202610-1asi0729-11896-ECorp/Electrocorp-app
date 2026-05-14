import type { DeviceType } from '../../domain/model/device.entity';

export interface DeviceResource {
    name: string;
    room: string;
    type: DeviceType;
    powerWatts: number;
}