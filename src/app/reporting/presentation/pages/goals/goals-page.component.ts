import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { ReportingFacade } from '../../../application/services/reporting.facade';

@Component({
  selector: 'app-goals-page',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './goals-page.component.html',
  styleUrl: './goals-page.component.scss',
})
export class GoalsPageComponent implements OnInit {
  showCreateForm = false;

  title = '';
  targetWatts = 1800;
  currentWatts = 0;
  startDate = '2026-05-01';
  endDate = '2026-06-01';

  constructor(readonly reportingFacade: ReportingFacade) {}

  async ngOnInit(): Promise<void> {
    await this.reportingFacade.loadGoals();
  }

  openCreateForm(): void {
    this.showCreateForm = true;
  }

  closeCreateForm(): void {
    this.showCreateForm = false;
    this.resetForm();
  }

  async handleCreateGoal(): Promise<void> {
    if (!this.title.trim()) {
      return;
    }

    if (Number(this.targetWatts) <= 0) {
      return;
    }

    if (Number(this.currentWatts) < 0) {
      return;
    }

    if (!this.startDate || !this.endDate) {
      return;
    }

    await this.reportingFacade.createEnergyGoal({
      title: this.title.trim(),
      targetWatts: Number(this.targetWatts),
      currentWatts: Number(this.currentWatts),
      startDate: this.startDate,
      endDate: this.endDate,
    });

    if (!this.reportingFacade.error()) {
      this.closeCreateForm();
    }
  }

  private resetForm(): void {
    this.title = '';
    this.targetWatts = 1800;
    this.currentWatts = 0;
    this.startDate = '2026-05-01';
    this.endDate = '2026-06-01';
  }
}
