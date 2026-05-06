import type { DeviceStatus, DeviceType } from '../../domain/model/device.entity';

export interface DeviceResource {
    name: string;
    type: DeviceType;
    status: DeviceStatus;
    room: string;
    powerWatts: number;
}