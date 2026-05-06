import { PlansApiEndpoint } from '../../infrastructure/api/plans-api-endpoint';
import { SubscriptionsApiEndpoint } from '../../infrastructure/api/subscriptions-api-endpoint';
import { PlanAssembler } from '../../infrastructure/assemblers/plan.assembler';
import { SubscriptionAssembler } from '../../infrastructure/assemblers/subscription.assembler';
import type { Plan } from '../../domain/model/plan.entity';
import type { Subscription } from '../../domain/model/subscription.entity';
import type { CreateSubscriptionDto } from '../dtos/create-subscription.dto';
import type { CancelSubscriptionDto } from '../dtos/cancel-subscription.dto';

export class BillingFacade {
    private readonly plansApi = new PlansApiEndpoint();
    private readonly subscriptionsApi = new SubscriptionsApiEndpoint();

    async getPlans(): Promise<Plan[]> {
        const responses = await this.plansApi.findAll();

        return responses.map(PlanAssembler.toEntity);
    }

    async getActiveSubscription(): Promise<Subscription | null> {
        const response = await this.subscriptionsApi.findActive();

        if (!response) return null;

        return SubscriptionAssembler.toEntity(response);
    }

    async createSubscription(payload: CreateSubscriptionDto): Promise<Subscription> {
        const response = await this.subscriptionsApi.create({
            planCode: payload.planCode,
        });

        return SubscriptionAssembler.toEntity(response);
    }

    async cancelSubscription(payload: CancelSubscriptionDto): Promise<Subscription | null> {
        const response = await this.subscriptionsApi.cancel(payload.subscriptionId);

        if (!response) return null;

        return SubscriptionAssembler.toEntity(response);
    }
}