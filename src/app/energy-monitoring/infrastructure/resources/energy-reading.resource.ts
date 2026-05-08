import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { EnergyReadingStatus } from '../../domain/model/energy-reading.entity';

export interface EnergyReadingResource extends BaseResource {
  deviceName: string;
  watts: number;
  recordedAt: string;
  status: EnergyReadingStatus;
}
