import type { Alert } from '../model/alert.entity';

export class AlertPriorityService {
    sortByPriority(alerts: Alert[]): Alert[] {
        const priority = {
            CRITICAL: 3,
            WARNING: 2,
            INFO: 1,
        };

        return [...alerts].sort((a, b) => priority[b.level] - priority[a.level]);
    }

    getUnreadCount(alerts: Alert[]): number {
        return alerts.filter((alert) => !alert.read).length;
    }
}