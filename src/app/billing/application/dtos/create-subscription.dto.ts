import type { PlanCode } from '../../domain/model/plan.entity';

export interface CreateSubscriptionDto {
    planCode: PlanCode;
}