import { Injectable } from '@angular/core';
import { EnergyReading } from '../model/energy-reading.entity';

@Injectable({
  providedIn: 'root',
})
export class EnergyRecommendationService {
  generateRecommendation(readings: EnergyReading[]): string {
    if (readings.length === 0) {
      return 'energy.noDataRecommendation';
    }

    const average =
      readings.reduce((total, reading) => total + reading.watts, 0) /
      readings.length;

    if (average >= 120) {
      return 'energy.highRecommendation';
    }

    if (average >= 80) {
      return 'energy.moderateRecommendation';
    }

    return 'energy.lowRecommendation';
  }
}
