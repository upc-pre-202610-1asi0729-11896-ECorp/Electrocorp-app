import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { EnergyReading } from '../../../domain/model/energy-reading.entity';

@Component({
  selector: 'app-usage-chart',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './usage-chart.component.html',
  styleUrl: './usage-chart.component.scss',
})
export class UsageChartComponent {
  @Input({ required: true }) readings: EnergyReading[] = [];

  getBarHeight(watts: number): number {
    const max = Math.max(...this.readings.map((reading) => reading.watts), 1);
    return Math.max(18, Math.round((watts / max) * 120));
  }
}
