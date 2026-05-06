import { defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';
import type { Alert } from '../../domain/model/alert.entity';
import { NotificationsFacade } from '../services/notifications.facade';
import { AlertPriorityService } from '../../domain/services/alert-priority.service';
import type { SendAlertDto } from '../dtos/send-alert.dto';

export const useNotificationsStore = defineStore('notifications', () => {
    const facade = new NotificationsFacade();
    const priorityService = new AlertPriorityService();

    const alerts = shallowRef<Alert[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const sortedAlerts = computed(() =>
        priorityService.sortByPriority(alerts.value)
    );

    const unreadCount = computed(() =>
        priorityService.getUnreadCount(alerts.value)
    );

    async function loadAlerts(): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            alerts.value = await facade.getAlerts();
        } catch {
            error.value = 'No se pudieron cargar las alertas.';
        } finally {
            loading.value = false;
        }
    }

    async function sendAlert(payload: SendAlertDto): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            const createdAlert = await facade.sendAlert(payload);
            alerts.value = [createdAlert, ...alerts.value];
        } catch {
            error.value = 'No se pudo crear la alerta.';
        } finally {
            loading.value = false;
        }
    }

    async function markAsRead(alertId: number): Promise<void> {
        error.value = null;

        try {
            const updatedAlert = await facade.markAlertAsRead({ alertId });

            if (!updatedAlert) return;

            alerts.value = alerts.value.map((alert) =>
                alert.id === alertId ? updatedAlert : alert
            );
        } catch {
            error.value = 'No se pudo marcar la alerta como leída.';
        }
    }

    return {
        alerts,
        sortedAlerts,
        unreadCount,
        loading,
        error,
        loadAlerts,
        sendAlert,
        markAsRead,
    };
});