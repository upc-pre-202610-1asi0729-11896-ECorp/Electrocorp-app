import type { EnergyReadingResponse } from '../responses/energy-reading.response';

const STORAGE_KEY = 'ec.energy.readings';

export class ReadingsApiEndpoint {
    async findAll(): Promise<EnergyReadingResponse[]> {
        const rawReadings = localStorage.getItem(STORAGE_KEY);

        if (!rawReadings) {
            const seedReadings = this.getSeedReadings();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(seedReadings));
            return seedReadings;
        }

        return JSON.parse(rawReadings) as EnergyReadingResponse[];
    }

    async findByDateRange(startDate: string, endDate: string): Promise<EnergyReadingResponse[]> {
        const readings = await this.findAll();

        return readings.filter((reading) => {
            const readingDate = new Date(reading.recordedAt).getTime();
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();

            return readingDate >= start && readingDate <= end;
        });
    }

    private getSeedReadings(): EnergyReadingResponse[] {
        return [
            {
                id: 1,
                deviceName: 'Smart plug - Living room',
                watts: 120,
                recordedAt: '2026-05-01',
            },
            {
                id: 2,
                deviceName: 'Main light switch',
                watts: 60,
                recordedAt: '2026-05-02',
            },
            {
                id: 3,
                deviceName: 'Desk lamp',
                watts: 35,
                recordedAt: '2026-05-03',
            },
            {
                id: 4,
                deviceName: 'Smart plug - Living room',
                watts: 145,
                recordedAt: '2026-05-04',
            },
            {
                id: 5,
                deviceName: 'Desk lamp',
                watts: 50,
                recordedAt: '2026-05-05',
            }
        ];
    }
}