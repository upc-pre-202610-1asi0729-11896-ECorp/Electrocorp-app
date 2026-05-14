import { API_BASE_URL } from '../../../shared/infrastructure/api/api-config';
import type { PlanResponse } from '../responses/plan.response';

export class PlansApiEndpoint {
    async findAll(): Promise<PlanResponse[]> {
        const response = await fetch(`${API_BASE_URL}/plans`);

        if (!response.ok) {
            throw new Error('Error loading plans.');
        }

        return response.json();
    }
}