import { Routine } from '../../domain/model/routine.entity';
import type { RoutineResponse } from '../responses/routine.response';
import type { RoutineResource } from '../resources/routine.resource';

export class RoutineAssembler {
    static toEntity(response: RoutineResponse): Routine {
        return new Routine({
            id: response.id,
            name: response.name,
            deviceId: response.deviceId,
            action: response.action,
            scheduledTime: response.scheduledTime,
            enabled: response.enabled,
        });
    }

    static toResource(entity: Routine): RoutineResource {
        return {
            name: entity.name,
            deviceId: entity.deviceId,
            action: entity.action,
            scheduledTime: entity.scheduledTime,
            enabled: entity.enabled,
        };
    }
}