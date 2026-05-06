import type { DeviceType } from '../../domain/model/device.entity';

export interface CreateDeviceDto {
    name: string;
    type: DeviceType;
    room: string;
    powerWatts: number;
}