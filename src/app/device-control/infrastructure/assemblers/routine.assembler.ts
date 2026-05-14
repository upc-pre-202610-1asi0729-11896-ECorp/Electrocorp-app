import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import { Routine } from '../../domain/model/routine.entity';
import { RoutineResource } from '../resources/routine.resource';
import { RoutineResponse } from '../responses/routine.response';

export class RoutineAssembler extends BaseAssembler<
  Routine,
  RoutineResource,
  RoutineResponse
> {
  override toEntity(response: RoutineResponse): Routine {
    return new Routine({
      id: response.id,
      name: response.name,
      deviceId: response.deviceId,
      action: response.action,
      scheduledTime: response.scheduledTime,
      enabled: response.enabled,
    });
  }

  override toResource(entity: Routine): RoutineResource {
    return {
      name: entity.name,
      deviceId: entity.deviceId,
      action: entity.action,
      scheduledTime: entity.scheduledTime,
      enabled: entity.enabled,
    };
  }
}
