import { DeviceStatus } from '../../domain/model/device.entity';

export interface UpdateDeviceStatusDto {
  deviceId: number;
  status: DeviceStatus;
}
