import type { EnergyReading } from '../model/energy-reading.entity';

export class AnomalyDetectionService {
    detectHighConsumption(readings: EnergyReading[], threshold: number): EnergyReading[] {
        return readings.filter((reading) => reading.watts >= threshold);
    }

    getRecommendation(readings: EnergyReading[]): string {
        if (readings.length === 0) {
            return 'There is not enough consumption data to generate recommendations.';
        }

        const total = readings.reduce((sum, reading) => sum + reading.watts, 0);
        const average = Math.round(total / readings.length);

        if (average >= 120) {
            return 'Your average energy consumption is high. Consider turning off unused devices or scheduling routines.';
        }

        if (average >= 70) {
            return 'Your energy consumption is moderate. Review peak hours to improve savings.';
        }

        return 'Your energy consumption is under control. Keep monitoring your devices regularly.';
    }
}