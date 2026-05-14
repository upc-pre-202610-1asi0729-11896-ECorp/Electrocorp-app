import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { EnergyMonitoringFacade } from '../../../application/services/energy-monitoring.facade';

@Component({
  selector: 'app-energy-history-page',
  standalone: true,
  imports: [DatePipe, TranslatePipe],
  templateUrl: './energy-history-page.component.html',
  styleUrls: ['./energy-history-page.component.scss'],
})
export class EnergyHistoryPageComponent implements OnInit {
  constructor(readonly energyMonitoringFacade: EnergyMonitoringFacade) {}

  async ngOnInit(): Promise<void> {
    await this.energyMonitoringFacade.loadReadings();
  }

  async handleExportCsv(): Promise<void> {
    await this.energyMonitoringFacade.exportCsv();
  }
}
