import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import { DeviceAssignment } from '../../domain/model/device-assignment.entity';
import { DeviceAssignmentResource } from '../resources/device-assignment.resource';
import { DeviceAssignmentResponse } from '../responses/device-assignment.response';

export class DeviceAssignmentAssembler extends BaseAssembler<
  DeviceAssignment,
  DeviceAssignmentResource,
  DeviceAssignmentResponse
> {
  override toEntity(response: DeviceAssignmentResponse): DeviceAssignment {
    return new DeviceAssignment({
      id: response.id,
      deviceId: response.deviceId,
      userId: response.userId,
      locationId: response.locationId,
      roomId: response.roomId,
      assignedAt: response.assignedAt,
    });
  }

  override toResource(entity: DeviceAssignment): DeviceAssignmentResource {
    return {
      deviceId: entity.deviceId,
      userId: entity.userId,
      locationId: entity.locationId,
      roomId: entity.roomId,
      assignedAt: entity.assignedAt,
    };
  }
}
