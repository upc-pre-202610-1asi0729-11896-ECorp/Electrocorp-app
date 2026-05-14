import { Subscription } from '../../domain/model/subscription.entity';
import type { SubscriptionResponse } from '../responses/subscription.response';

export class SubscriptionAssembler {
    static toEntity(response: SubscriptionResponse): Subscription {
        return new Subscription({
            id: response.id,
            planCode: response.planCode,
            status: response.status,
            startedAt: response.startedAt,
            endsAt: response.endsAt,
        });
    }
}