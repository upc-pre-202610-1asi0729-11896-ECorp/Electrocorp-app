import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';
import { EnergyGoalStatus } from '../../domain/model/energy-goal.entity';

export interface EnergyGoalResponse extends BaseResponse<number> {
  userId: number;
  title: string;
  targetWatts: number;
  currentWatts: number;
  startDate: string;
  endDate: string;
  status: EnergyGoalStatus;
}
