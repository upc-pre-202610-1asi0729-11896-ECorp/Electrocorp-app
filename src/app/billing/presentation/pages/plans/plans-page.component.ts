import { Component, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { BillingFacade } from '../../../application/services/billing.facade';
import { ProcessPaymentDto } from '../../../application/dtos/process-payment.dto';
import { Plan } from '../../../domain/model/plan.entity';
import { PlanCardComponent } from '../../components/plan-card/plan-card.component';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';

@Component({
  selector: 'app-plans-page',
  standalone: true,
  imports: [TranslatePipe, PlanCardComponent, PaymentFormComponent],
  templateUrl: './plans-page.component.html',
  styleUrls: ['./plans-page.component.scss'],
})
export class PlansPageComponent implements OnInit {
  readonly selectedPlan = signal<Plan | null>(null);

  constructor(readonly billingFacade: BillingFacade) {}

  async ngOnInit(): Promise<void> {
    await this.billingFacade.loadBilling();
  }

  handleSubscribe(plan: Plan): void {
    this.billingFacade.clearError();
    this.selectedPlan.set(plan);
  }

  closePaymentForm(): void {
    this.selectedPlan.set(null);
    this.billingFacade.clearError();
  }

  async handleConfirmPayment(payload: ProcessPaymentDto): Promise<void> {
    const paymentApproved = await this.billingFacade.processFakePayment(payload);

    if (!paymentApproved) return;

    await this.billingFacade.subscribe({
      planCode: payload.planCode,
    });

    if (!this.billingFacade.error()) {
      this.selectedPlan.set(null);
    }
  }

  async handleCancelSubscription(): Promise<void> {
    await this.billingFacade.cancelCurrentSubscription();
  }
}
