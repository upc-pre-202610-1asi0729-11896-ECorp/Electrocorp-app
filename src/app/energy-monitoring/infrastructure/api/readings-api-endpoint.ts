import { API_BASE_URL } from '../../../shared/infrastructure/api/api-config';
import type { EnergyReadingResponse } from '../responses/energy-reading.response';

export class ReadingsApiEndpoint {
    async findAll(): Promise<EnergyReadingResponse[]> {
        const response = await fetch(`${API_BASE_URL}/energyReadings`);

        if (!response.ok) {
            throw new Error('Error loading energy readings.');
        }

        return response.json();
    }

    async findByDateRange(
        startDate: string,
        endDate: string
    ): Promise<EnergyReadingResponse[]> {
        const response = await fetch(`${API_BASE_URL}/energyReadings`);

        if (!response.ok) {
            throw new Error('Error filtering energy readings.');
        }

        const readings = (await response.json()) as EnergyReadingResponse[];

        return readings.filter((reading) => {
            const readingDate = new Date(reading.recordedAt).getTime();
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();

            return readingDate >= start && readingDate <= end;
        });
    }
}