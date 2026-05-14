import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { EnergyGoalStatus } from '../../domain/model/energy-goal.entity';

export interface EnergyGoalResource extends BaseResource {
  userId: number;
  title: string;
  targetWatts: number;
  currentWatts: number;
  startDate: string;
  endDate: string;
  status: EnergyGoalStatus;
}
