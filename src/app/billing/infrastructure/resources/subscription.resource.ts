import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { PlanCode } from '../../domain/model/plan.entity';
import { SubscriptionStatus } from '../../domain/model/subscription.entity';

export interface SubscriptionResource extends BaseResource {
  userId: number;
  planCode: PlanCode;
  status: SubscriptionStatus;
  startedAt: string;
  endsAt: string | null;
}
