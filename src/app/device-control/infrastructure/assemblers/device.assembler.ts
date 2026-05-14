import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import { Device } from '../../domain/model/device.entity';
import { DeviceResource } from '../resources/device.resource';
import { DeviceResponse } from '../responses/device.response';

export class DeviceAssembler extends BaseAssembler<
  Device,
  DeviceResource,
  DeviceResponse
> {
  override toEntity(response: DeviceResponse): Device {
    return new Device({
      id: response.id,
      name: response.name,
      room: response.room,
      type: response.type,
      status: response.status,
      powerWatts: response.powerWatts,
    });
  }

  override toResource(entity: Device): DeviceResource {
    return {
      name: entity.name,
      room: entity.room,
      type: entity.type,
      powerWatts: entity.powerWatts,
    };
  }
}
