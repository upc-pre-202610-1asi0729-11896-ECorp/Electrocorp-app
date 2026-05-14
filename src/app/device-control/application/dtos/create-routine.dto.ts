import { RoutineAction } from '../../domain/model/routine.entity';

export interface CreateRoutineDto {
  name: string;
  deviceId: number;
  action: RoutineAction;
  scheduledTime: string;
}
