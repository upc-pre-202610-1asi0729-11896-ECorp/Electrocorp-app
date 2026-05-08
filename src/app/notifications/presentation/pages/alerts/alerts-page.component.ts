import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { AlertLevel } from '../../../domain/model/alert.entity';
import { NotificationsFacade } from '../../../application/services/notifications.facade';
import { AlertListComponent } from '../../components/alert-list/alert-list.component';

@Component({
  selector: 'app-alerts-page',
  standalone: true,
  imports: [FormsModule, TranslatePipe, AlertListComponent],
  templateUrl: './alerts-page.component.html',
  styleUrls: ['./alerts-page.component.scss'],
})
export class AlertsPageComponent implements OnInit {
  title = '';
  message = '';
  level: AlertLevel = 'INFO';

  readonly alertLevels: AlertLevel[] = ['INFO', 'WARNING', 'CRITICAL'];

  constructor(readonly notificationsFacade: NotificationsFacade) {}

  async ngOnInit(): Promise<void> {
    await this.notificationsFacade.loadAlerts();
  }

  async handleSubmit(): Promise<void> {
    await this.notificationsFacade.createAlert({
      title: this.title,
      message: this.message,
      level: this.level,
    });

    this.title = '';
    this.message = '';
    this.level = 'INFO';
  }

  async handleMarkAsRead(alertId: number): Promise<void> {
    await this.notificationsFacade.markAsRead({
      alertId,
    });
  }
}
