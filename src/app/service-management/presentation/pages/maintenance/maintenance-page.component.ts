import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { ServiceManagementFacade } from '../../../application/services/service-management.facade';
import { MaintenanceTicketStatus } from '../../../domain/model/maintenance-ticket.entity';

@Component({
  selector: 'app-maintenance-page',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './maintenance-page.component.html',
  styleUrl: './maintenance-page.component.scss',
})
export class MaintenancePageComponent implements OnInit {
  showCreateForm = false;

  deviceId = 1;
  title = '';
  description = '';
  scheduledAt = '2026-05-20';
  status: MaintenanceTicketStatus = 'PENDING';

  readonly statuses: MaintenanceTicketStatus[] = [
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
  ];

  constructor(readonly serviceManagementFacade: ServiceManagementFacade) {}

  async ngOnInit(): Promise<void> {
    await this.serviceManagementFacade.loadMaintenanceTickets();
  }

  openCreateForm(): void {
    this.serviceManagementFacade.clearError();
    this.showCreateForm = true;
  }

  closeCreateForm(): void {
    this.showCreateForm = false;
    this.resetForm();
  }

  async handleCreateMaintenanceTicket(): Promise<void> {
    if (Number(this.deviceId) <= 0) {
      return;
    }

    if (!this.title.trim()) {
      return;
    }

    if (!this.description.trim()) {
      return;
    }

    if (!this.scheduledAt) {
      return;
    }

    await this.serviceManagementFacade.createMaintenanceTicket({
      deviceId: Number(this.deviceId),
      title: this.title.trim(),
      description: this.description.trim(),
      scheduledAt: this.scheduledAt,
      status: this.status,
    });

    if (!this.serviceManagementFacade.error()) {
      this.closeCreateForm();
    }
  }

  private resetForm(): void {
    this.deviceId = 1;
    this.title = '';
    this.description = '';
    this.scheduledAt = '2026-05-20';
    this.status = 'PENDING';
  }
}
