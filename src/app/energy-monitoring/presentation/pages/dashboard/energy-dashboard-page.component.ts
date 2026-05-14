import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { EnergyMonitoringFacade } from '../../../application/services/energy-monitoring.facade';
import { MetricsCardsComponent } from '../../components/metrics-cards/metrics-cards.component';
import { UsageChartComponent } from '../../components/usage-chart/usage-chart.component';

@Component({
  selector: 'app-energy-dashboard-page',
  standalone: true,
  imports: [
    FormsModule,
    TranslatePipe,
    MetricsCardsComponent,
    UsageChartComponent,
  ],
  templateUrl: './energy-dashboard-page.component.html',
  styleUrls: ['./energy-dashboard-page.component.scss'],
})
export class EnergyDashboardPageComponent implements OnInit {
  startDate = '2026-05-01';
  endDate = '2026-05-06';

  constructor(readonly energyMonitoringFacade: EnergyMonitoringFacade) {}

  async ngOnInit(): Promise<void> {
    await this.energyMonitoringFacade.loadReadings();
  }

  handleFilter(): void {
    this.energyMonitoringFacade.filterReadings({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }

  handleReset(): void {
    this.energyMonitoringFacade.resetFilter();
  }

  async handleExportCsv(): Promise<void> {
    await this.energyMonitoringFacade.exportCsv();
  }
}
