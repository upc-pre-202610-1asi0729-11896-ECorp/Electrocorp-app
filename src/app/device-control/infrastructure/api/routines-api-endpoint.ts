import { API_BASE_URL } from '../../../shared/infrastructure/api/api-config';
import type { RoutineResponse } from '../responses/routine.response';
import type { RoutineResource } from '../resources/routine.resource';

export class RoutinesApiEndpoint {
    async findAll(): Promise<RoutineResponse[]> {
        const response = await fetch(`${API_BASE_URL}/routines`);

        if (!response.ok) {
            throw new Error('Error loading routines.');
        }

        return response.json();
    }

    async create(resource: RoutineResource): Promise<RoutineResponse> {
        const response = await fetch(`${API_BASE_URL}/routines`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Date.now(),
                ...resource,
            }),
        });

        if (!response.ok) {
            throw new Error('Error creating routine.');
        }

        return response.json();
    }

    async updateEnabled(
        routineId: number,
        enabled: boolean
    ): Promise<RoutineResponse | null> {
        const response = await fetch(`${API_BASE_URL}/routines/${routineId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ enabled }),
        });

        if (!response.ok) {
            return null;
        }

        return response.json();
    }

    async delete(routineId: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/routines/${routineId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error deleting routine.');
        }
    }
}