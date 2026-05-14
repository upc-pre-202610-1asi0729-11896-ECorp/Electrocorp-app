import { PlansApiEndpoint } from '../../infrastructure/api/plans-api-endpoint';
import { SubscriptionsApiEndpoint } from '../../infrastructure/api/subscriptions-api-endpoint';

import { PlanAssembler } from '../../infrastructure/assemblers/plan.assembler';
import { SubscriptionAssembler } from '../../infrastructure/assemblers/subscription.assembler';

import type { Plan } from '../../domain/model/plan.entity';
import type { Subscription } from '../../domain/model/subscription.entity';
import type { SubscriptionResource } from '../../infrastructure/resources/subscription.resource';

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

    async subscribe(resource: SubscriptionResource): Promise<Subscription> {
        const response = await this.subscriptionsApi.create(resource);

        return SubscriptionAssembler.toEntity(response);
    }

    async cancelSubscription(subscriptionId: number): Promise<Subscription | null> {
        const response = await this.subscriptionsApi.cancel(subscriptionId);

        if (!response) return null;

        return SubscriptionAssembler.toEntity(response);
    }
}