import { Injectable } from '@angular/core';
import { Routine } from '../model/routine.entity';

@Injectable({
  providedIn: 'root',
})
export class RoutineConflictCheckerService {
  hasConflict(candidate: Routine, routines: Routine[]): boolean {
    return routines.some(
      (routine) =>
        routine.enabled &&
        candidate.enabled &&
        routine.deviceId === candidate.deviceId &&
        routine.scheduledTime === candidate.scheduledTime
    );
  }
}
