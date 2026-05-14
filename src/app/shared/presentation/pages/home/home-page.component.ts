import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { DeviceControlFacade } from '../../../../device-control/application/services/device-control.facade';
import { EnergyMonitoringFacade } from '../../../../energy-monitoring/application/services/energy-monitoring.facade';
import { NotificationsFacade } from '../../../../notifications/application/services/notifications.facade';
import { BillingFacade } from '../../../../billing/application/services/billing.facade';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    readonly deviceControlFacade: DeviceControlFacade,
    readonly energyMonitoringFacade: EnergyMonitoringFacade,
    readonly notificationsFacade: NotificationsFacade,
    readonly billingFacade: BillingFacade
  ) {}

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.deviceControlFacade.loadDevices(),
      this.deviceControlFacade.loadRoutines(),
      this.energyMonitoringFacade.loadReadings(),
      this.notificationsFacade.loadAlerts(),
      this.billingFacade.loadBilling(),
    ]);
  }
}
