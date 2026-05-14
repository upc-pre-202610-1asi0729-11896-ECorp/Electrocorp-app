import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';
import { EnergyReadingStatus } from '../../domain/model/energy-reading.entity';

export interface EnergyReadingResponse extends BaseResponse<number> {
  deviceName: string;
  watts: number;
  recordedAt: string;
  status?: EnergyReadingStatus;
}
