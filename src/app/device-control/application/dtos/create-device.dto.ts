import { DeviceType } from '../../domain/model/device.entity';

export interface CreateDeviceDto {
  name: string;
  room: string;
  type: DeviceType;
  powerWatts: number;
}
