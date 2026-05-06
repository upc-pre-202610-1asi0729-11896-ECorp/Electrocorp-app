import type { Plan } from '../model/plan.entity';

export class SubscriptionPolicyService {
    canSubscribeTo(plan: Plan): boolean {
        return plan.monthlyPrice > 0;
    }

    getBusinessMessage(plan: Plan): string {
        if (plan.code === 'ENTERPRISE') {
            return 'Recommended for owners managing multiple business locations.';
        }

        if (plan.code === 'PROFESSIONAL') {
            return 'Recommended for homes or small businesses with several devices.';
        }

        return 'Recommended for users who are starting with smart energy control.';
    }
}