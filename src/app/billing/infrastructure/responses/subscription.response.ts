import type { PlanCode } from '../../domain/model/plan.entity';
import type { SubscriptionStatus } from '../../domain/model/subscription.entity';

export interface SubscriptionResponse {
    id: number;
    planCode: PlanCode;
    status: SubscriptionStatus;
    startedAt: string;
    endsAt: string | null;
}