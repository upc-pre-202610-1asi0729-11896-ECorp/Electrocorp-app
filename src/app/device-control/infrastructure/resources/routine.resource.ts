import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { RoutineAction } from '../../domain/model/routine.entity';

export interface RoutineResource extends BaseResource {
  name: string;
  deviceId: number;
  action: RoutineAction;
  scheduledTime: string;
  enabled: boolean;
}
