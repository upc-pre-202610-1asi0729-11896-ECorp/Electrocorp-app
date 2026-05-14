import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { ServiceManagementFacade } from '../../../application/services/service-management.facade';
import { SupportTicketPriority } from '../../../domain/model/support-ticket.entity';

@Component({
  selector: 'app-support-page',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './support-page.component.html',
  styleUrl: './support-page.component.scss',
})
export class SupportPageComponent implements OnInit {
  showCreateForm = false;

  subject = '';
  description = '';
  priority: SupportTicketPriority = 'MEDIUM';

  readonly priorities: SupportTicketPriority[] = [
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL',
  ];

  constructor(readonly serviceManagementFacade: ServiceManagementFacade) {}

  async ngOnInit(): Promise<void> {
    await this.serviceManagementFacade.loadSupportTickets();
  }

  openCreateForm(): void {
    this.serviceManagementFacade.clearError();
    this.showCreateForm = true;
  }

  closeCreateForm(): void {
    this.showCreateForm = false;
    this.resetForm();
  }

  async handleCreateTicket(): Promise<void> {
    if (!this.subject.trim()) {
      return;
    }

    if (!this.description.trim()) {
      return;
    }

    await this.serviceManagementFacade.createSupportTicket({
      subject: this.subject.trim(),
      description: this.description.trim(),
      priority: this.priority,
    });

    if (!this.serviceManagementFacade.error()) {
      this.closeCreateForm();
    }
  }

  private resetForm(): void {
    this.subject = '';
    this.description = '';
    this.priority = 'MEDIUM';
  }
}
