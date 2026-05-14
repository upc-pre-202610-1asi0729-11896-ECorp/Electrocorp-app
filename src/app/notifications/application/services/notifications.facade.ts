import { computed, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { BillingFacade } from '../../../billing/application/services/billing.facade';
import { PlanPermissionService } from '../../../billing/domain/services/plan-permission.service';

import { Alert } from '../../domain/model/alert.entity';
import { CreateAlertDto } from '../dtos/create-alert.dto';
import { MarkAlertAsReadDto } from '../dtos/mark-alert-as-read.dto';
import { AlertsApiService } from '../../infrastructure/api/alerts-api.service';
import { AlertAssembler } from '../../infrastructure/assemblers/alert.assembler';
import { AlertPriorityService } from '../../domain/services/alert-priority.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsFacade {
  private readonly alertAssembler = new AlertAssembler();

  private readonly alertsSignal = signal<Alert[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly alerts = computed(() => this.alertsSignal());
  readonly loading = computed(() => this.loadingSignal());
  readonly error = computed(() => this.errorSignal());

  readonly unreadCount = computed(
    () => this.alertsSignal().filter((alert) => alert.unread).length
  );

  readonly sortedAlerts = computed(() =>
    this.alertPriorityService.sortByPriorityAndDate(this.alertsSignal())
  );

  async loadAlerts(): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      const responses = await firstValueFrom(this.alertsApi.findAll());

      this.alertsSignal.set(
        responses.map((response) => this.alertAssembler.toEntity(response))
      );
    } catch (error) {
      console.error(error);
      this.errorSignal.set('alerts.loadError');
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async createAlert(payload: CreateAlertDto): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      await this.billingFacade.loadBilling();

      const activePlanCode = this.billingFacade.activePlanCode();

      const canCreateAlert = this.planPermissionService.canCreateManualAlert(
        activePlanCode,
        this.alertsSignal().length
      );

      if (!canCreateAlert) {
        this.errorSignal.set('alerts.planLimitReached');
        return;
      }

      const response = await firstValueFrom(
        this.alertsApi.create({
          title: payload.title,
          message: payload.message,
          level: payload.level,
          createdAt: new Date().toISOString().slice(0, 10),
          read: false,
        })
      );

      const createdAlert = this.alertAssembler.toEntity(response);

      this.alertsSignal.set([createdAlert, ...this.alertsSignal()]);
    } catch (error) {
      console.error(error);
      this.errorSignal.set('alerts.createError');
    } finally {
      this.loadingSignal.set(false);
    }
  }

  async markAsRead(payload: MarkAlertAsReadDto): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.alertsApi.markAsRead(payload.alertId)
      );

      const updatedAlert = this.alertAssembler.toEntity(response);

      this.alertsSignal.set(
        this.alertsSignal().map((alert) =>
          alert.id === payload.alertId ? updatedAlert : alert
        )
      );
    } catch (error) {
      console.error(error);
      this.errorSignal.set('alerts.markAsReadError');
    }
  }

  constructor(
    private readonly alertsApi: AlertsApiService,
    private readonly alertPriorityService: AlertPriorityService,
    private readonly billingFacade: BillingFacade,
    private readonly planPermissionService: PlanPermissionService
  ) {}
}
