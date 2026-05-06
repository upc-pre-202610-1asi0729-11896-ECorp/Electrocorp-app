import { EnergyReading } from '../../domain/model/energy-reading.entity';
import type { EnergyReadingResponse } from '../responses/energy-reading.response';
import type { EnergyReadingResource } from '../resources/energy-reading.resource';

export class EnergyReadingAssembler {
    static toEntity(response: EnergyReadingResponse): EnergyReading {
        return new EnergyReading({
            id: response.id,
            deviceName: response.deviceName,
            watts: response.watts,
            recordedAt: response.recordedAt,
        });
    }

    static toResource(entity: EnergyReading): EnergyReadingResource {
        return {
            deviceName: entity.deviceName,
            watts: entity.watts,
            recordedAt: entity.recordedAt,
        };
    }
}