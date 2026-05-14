import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import { Alert } from '../../domain/model/alert.entity';
import { AlertResource } from '../resources/alert.resource';
import { AlertResponse } from '../responses/alert.response';

export class AlertAssembler extends BaseAssembler<
  Alert,
  AlertResource,
  AlertResponse
> {
  override toEntity(response: AlertResponse): Alert {
    return new Alert({
      id: response.id,
      title: response.title,
      message: response.message,
      level: response.level,
      createdAt: response.createdAt,
      read: response.read,
    });
  }

  override toResource(entity: Alert): AlertResource {
    return {
      title: entity.title,
      message: entity.message,
      level: entity.level,
      createdAt: entity.createdAt,
      read: entity.read,
    };
  }
}
