import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import {
  EnergyReading,
  EnergyReadingStatus,
} from '../../domain/model/energy-reading.entity';
import { EnergyReadingResource } from '../resources/energy-reading.resource';
import { EnergyReadingResponse } from '../responses/energy-reading.response';

export class EnergyReadingAssembler extends BaseAssembler<
  EnergyReading,
  EnergyReadingResource,
  EnergyReadingResponse
> {
  override toEntity(response: EnergyReadingResponse): EnergyReading {
    const status: EnergyReadingStatus =
      response.status ?? (response.watts >= 120 ? 'HIGH' : 'NORMAL');

    return new EnergyReading({
      id: response.id,
      deviceName: response.deviceName,
      watts: response.watts,
      recordedAt: response.recordedAt,
      status,
    });
  }

  override toResource(entity: EnergyReading): EnergyReadingResource {
    return {
      deviceName: entity.deviceName,
      watts: entity.watts,
      recordedAt: entity.recordedAt,
      status: entity.status,
    };
  }
}
