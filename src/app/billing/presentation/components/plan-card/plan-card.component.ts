import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Plan, PlanCode } from '../../../domain/model/plan.entity';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
})
export class PlanCardComponent {
  @Input({ required: true }) plan!: Plan;
  @Input() loading = false;
  @Input() isCurrentPlan = false;

  @Output() subscribe = new EventEmitter<Plan>();

  onSubscribe(): void {
    this.subscribe.emit(this.plan);
  }

  getDescriptionKey(planCode: PlanCode): string {
    return `billing.planDescriptions.${planCode}`;
  }

  getFeatureKeys(planCode: PlanCode): string[] {
    const features: Record<PlanCode, string[]> = {
      STARTER: [
        'billing.planFeatures.STARTER.devices',
        'billing.planFeatures.STARTER.dashboard',
        'billing.planFeatures.STARTER.alerts',
      ],
      PROFESSIONAL: [
        'billing.planFeatures.PROFESSIONAL.devices',
        'billing.planFeatures.PROFESSIONAL.analytics',
        'billing.planFeatures.PROFESSIONAL.routines',
        'billing.planFeatures.PROFESSIONAL.reports',
      ],
      ENTERPRISE: [
        'billing.planFeatures.ENTERPRISE.locations',
        'billing.planFeatures.ENTERPRISE.accessProfiles',
        'billing.planFeatures.ENTERPRISE.alerts',
        'billing.planFeatures.ENTERPRISE.support',
      ],
    };

    return features[planCode];
  }
}
