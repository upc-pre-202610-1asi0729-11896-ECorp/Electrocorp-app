import { ReadingsApiEndpoint } from '../../infrastructure/api/readings-api-endpoint';
import { EnergyReadingAssembler } from '../../infrastructure/assemblers/energy-reading.assembler';
import type { EnergyReading } from '../../domain/model/energy-reading.entity';
import type { FilterHistoryDto } from '../dtos/filter-history.dto';

export class EnergyMonitoringFacade {
    private readonly readingsApi = new ReadingsApiEndpoint();

    async getReadings(): Promise<EnergyReading[]> {
        const responses = await this.readingsApi.findAll();

        return responses.map(EnergyReadingAssembler.toEntity);
    }

    async filterReadings(payload: FilterHistoryDto): Promise<EnergyReading[]> {
        const responses = await this.readingsApi.findByDateRange(
            payload.startDate,
            payload.endDate
        );

        return responses.map(EnergyReadingAssembler.toEntity);
    }
}