import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';
import { RoutineAction } from '../../domain/model/routine.entity';

export interface RoutineResponse extends BaseResponse<number> {
  name: string;
  deviceId: number;
  action: RoutineAction;
  scheduledTime: string;
  enabled: boolean;
}
