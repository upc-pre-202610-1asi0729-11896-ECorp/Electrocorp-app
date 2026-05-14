import { Routine } from '../model/routine.entity';

export class RoutineConflictCheckerService {
    hasConflict(newRoutine: Routine, existingRoutines: Routine[]): boolean {
        return existingRoutines.some((routine) =>
            routine.deviceId === newRoutine.deviceId &&
            routine.scheduledTime === newRoutine.scheduledTime &&
            routine.enabled
        );
    }
}