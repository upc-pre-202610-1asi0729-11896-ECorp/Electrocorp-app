import type { AlertResponse } from '../responses/alert.response';
import type { AlertResource } from '../resources/alert.resource';

const STORAGE_KEY = 'ec.notifications.alerts';

export class AlertsApiEndpoint {
    async findAll(): Promise<AlertResponse[]> {
        const rawAlerts = localStorage.getItem(STORAGE_KEY);

        if (!rawAlerts) {
            const seedAlerts = this.getSeedAlerts();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAlerts));
            return seedAlerts;
        }

        return JSON.parse(rawAlerts) as AlertResponse[];
    }

    async create(resource: AlertResource): Promise<AlertResponse> {
        const alerts = await this.findAll();

        const createdAlert: AlertResponse = {
            id: Date.now(),
            title: resource.title,
            message: resource.message,
            level: resource.level,
            createdAt: new Date().toISOString().slice(0, 10),
            read: false,
        };

        const updatedAlerts = [createdAlert, ...alerts];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAlerts));

        return createdAlert;
    }

    async markAsRead(alertId: number): Promise<AlertResponse | null> {
        const alerts = await this.findAll();

        const updatedAlerts = alerts.map((alert) =>
            alert.id === alertId ? { ...alert, read: true } : alert
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAlerts));

        return updatedAlerts.find((alert) => alert.id === alertId) ?? null;
    }

    private getSeedAlerts(): AlertResponse[] {
        return [
            {
                id: 1,
                title: 'High consumption detected',
                message: 'Smart plug - Living room reached an unusual consumption peak.',
                level: 'CRITICAL',
                createdAt: '2026-05-05',
                read: false,
            },
            {
                id: 2,
                title: 'Monthly report ready',
                message: 'Your monthly consumption report is ready to export.',
                level: 'INFO',
                createdAt: '2026-05-04',
                read: false,
            },
            {
                id: 3,
                title: 'Automation suggestion',
                message: 'You can schedule your desk lamp to turn off after midnight.',
                level: 'WARNING',
                createdAt: '2026-05-03',
                read: true,
            },
        ];
    }
}