import type { SubscriptionResponse } from '../responses/subscription.response';
import type { SubscriptionResource } from '../resources/subscription.resource';

const STORAGE_KEY = 'ec.billing.subscription';

export class SubscriptionsApiEndpoint {
    async findActive(): Promise<SubscriptionResponse | null> {
        const rawSubscription = localStorage.getItem(STORAGE_KEY);

        if (!rawSubscription) {
            return null;
        }

        return JSON.parse(rawSubscription) as SubscriptionResponse;
    }

    async create(resource: SubscriptionResource): Promise<SubscriptionResponse> {
        const subscription: SubscriptionResponse = {
            id: Date.now(),
            planCode: resource.planCode,
            status: 'ACTIVE',
            startedAt: new Date().toISOString().slice(0, 10),
            endsAt: null,
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));

        return subscription;
    }

    async cancel(subscriptionId: number): Promise<SubscriptionResponse | null> {
        const currentSubscription = await this.findActive();

        if (!currentSubscription || currentSubscription.id !== subscriptionId) {
            return null;
        }

        const canceledSubscription: SubscriptionResponse = {
            ...currentSubscription,
            status: 'CANCELED',
            endsAt: new Date().toISOString().slice(0, 10),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(canceledSubscription));

        return canceledSubscription;
    }
}