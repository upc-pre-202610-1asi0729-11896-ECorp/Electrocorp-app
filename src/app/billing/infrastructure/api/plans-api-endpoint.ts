import type { PlanResponse } from '../responses/plan.response';

export class PlansApiEndpoint {
    async findAll(): Promise<PlanResponse[]> {
        return [
            {
                id: 1,
                code: 'STARTER',
                name: 'Starter',
                monthlyPrice: 19,
                features: [
                    'Up to 5 smart devices',
                    'Basic energy dashboard',
                    'Email alerts',
                ],
            },
            {
                id: 2,
                code: 'PROFESSIONAL',
                name: 'Professional',
                monthlyPrice: 49,
                features: [
                    'Up to 20 smart devices',
                    'Advanced energy analytics',
                    'Automation routines',
                    'Monthly reports',
                ],
            },
            {
                id: 3,
                code: 'ENTERPRISE',
                name: 'Enterprise',
                monthlyPrice: 129,
                features: [
                    'Multiple business locations',
                    'Access profiles for staff',
                    'Advanced alerts',
                    'Priority support',
                ],
            },
        ];
    }
}