import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { ReportingFacade } from '../../../application/services/reporting.facade';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './reports-page.component.html',
  styleUrl: './reports-page.component.scss',
})
export class ReportsPageComponent implements OnInit {
  readonly today = new Date().toISOString().slice(0, 10);

  showGenerateForm = false;

  startDate = '2026-05-01';
  endDate = this.today;

  constructor(readonly reportingFacade: ReportingFacade) {}

  async ngOnInit(): Promise<void> {
    await this.reportingFacade.loadReports();
  }

  openGenerateForm(): void {
    this.reportingFacade.clearError();
    this.showGenerateForm = true;
  }

  closeGenerateForm(): void {
    this.showGenerateForm = false;
    this.resetForm();
  }

  async handleGenerateReport(): Promise<void> {
    if (!this.startDate || !this.endDate) {
      this.reportingFacade.clearError();
      alert('Selecciona una fecha de inicio y una fecha de fin.');
      return;
    }

    if (this.startDate > this.endDate) {
      this.reportingFacade.clearError();
      alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
      return;
    }

    if (this.endDate > this.today) {
      this.reportingFacade.clearError();
      alert('No puedes generar reportes con fechas futuras.');
      return;
    }

    await this.reportingFacade.generateConsumptionReport({
      startDate: this.startDate,
      endDate: this.endDate,
    });

    if (!this.reportingFacade.error()) {
      this.closeGenerateForm();
    }
  }

  private resetForm(): void {
    this.startDate = '2026-05-01';
    this.endDate = this.today;
  }
}
