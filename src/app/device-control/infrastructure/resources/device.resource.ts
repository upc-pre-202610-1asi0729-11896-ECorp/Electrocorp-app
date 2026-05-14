import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { DeviceType } from '../../domain/model/device.entity';

export interface DeviceResource extends BaseResource {
  name: string;
  room: string;
  type: DeviceType;
  powerWatts: number;
}
