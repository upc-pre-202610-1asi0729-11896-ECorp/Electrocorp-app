import { API_BASE_URL } from '../../../shared/infrastructure/api/api-config';
import type { AlertResponse } from '../responses/alert.response';
import type { AlertResource } from '../resources/alert.resource';

export class AlertsApiEndpoint {
    async findAll(): Promise<AlertResponse[]> {
        const response = await fetch(`${API_BASE_URL}/alerts`);

        if (!response.ok) {
            throw new Error('Error loading alerts.');
        }

        return response.json();
    }

    async create(resource: AlertResource): Promise<AlertResponse> {
        const response = await fetch(`${API_BASE_URL}/alerts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Date.now(),
                title: resource.title,
                message: resource.message,
                level: resource.level,
                createdAt: new Date().toISOString().slice(0, 10),
                read: false,
            }),
        });

        if (!response.ok) {
            throw new Error('Error creating alert.');
        }

        return response.json();
    }

    async markAsRead(alertId: number): Promise<AlertResponse | null> {
        const response = await fetch(`${API_BASE_URL}/alerts/${alertId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ read: true }),
        });

        if (!response.ok) {
            return null;
        }

        return response.json();
    }
}