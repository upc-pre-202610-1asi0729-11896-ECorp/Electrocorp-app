import type { RoutineAction } from '../../domain/model/routine.entity';

export interface RoutineResource {
    name: string;
    deviceId: number;
    action: RoutineAction;
    scheduledTime: string;
    enabled: boolean;
}