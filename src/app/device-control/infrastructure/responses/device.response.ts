import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';
import {
  DeviceStatus,
  DeviceType,
} from '../../domain/model/device.entity';

export interface DeviceResponse extends BaseResponse<number> {
  name: string;
  room: string;
  type: DeviceType;
  status: DeviceStatus;
  powerWatts: number;
}
