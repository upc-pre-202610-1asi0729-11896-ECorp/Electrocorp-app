import type { RoutineAction } from '../../domain/model/routine.entity';

export interface RoutineResponse {
    id: number;
    name: string;
    deviceId: number;
    action: RoutineAction;
    scheduledTime: string;
    enabled: boolean;
}