import { API_BASE_URL } from '../../../shared/infrastructure/api/api-config';
import type { SubscriptionResponse } from '../responses/subscription.response';
import type { SubscriptionResource } from '../resources/subscription.resource';

export class SubscriptionsApiEndpoint {
    async findActive(): Promise<SubscriptionResponse | null> {
        const response = await fetch(`${API_BASE_URL}/subscriptions?status=ACTIVE`);

        if (!response.ok) {
            throw new Error('Error loading active subscription.');
        }

        const subscriptions = (await response.json()) as SubscriptionResponse[];

        return subscriptions[0] ?? null;
    }

    async create(resource: SubscriptionResource): Promise<SubscriptionResponse> {
        const currentSubscription = await this.findActive();

        if (currentSubscription) {
            await this.cancel(currentSubscription.id);
        }

        const subscription: SubscriptionResponse = {
            id: Date.now(),
            planCode: resource.planCode,
            status: 'ACTIVE',
            startedAt: new Date().toISOString().slice(0, 10),
            endsAt: null,
        };

        const response = await fetch(`${API_BASE_URL}/subscriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription),
        });

        if (!response.ok) {
            throw new Error('Error creating subscription.');
        }

        return response.json();
    }

    async cancel(subscriptionId: number): Promise<SubscriptionResponse | null> {
        const canceledSubscription = {
            status: 'CANCELED',
            endsAt: new Date().toISOString().slice(0, 10),
        };

        const response = await fetch(`${API_BASE_URL}/subscriptions/${subscriptionId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(canceledSubscription),
        });

        if (!response.ok) {
            return null;
        }

        return response.json();
    }
}