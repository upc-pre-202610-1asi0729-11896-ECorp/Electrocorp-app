import type { RouteRecordRaw } from 'vue-router';

const AlertsView = () => import('../views/alerts/AlertsView.vue');

export const notificationsRoutes: RouteRecordRaw[] = [
    {
        path: '/notifications/alerts',
        name: 'notifications-alerts',
        component: AlertsView,
        meta: {
            title: 'ElectroCorp - Alerts',
            requiresAuth: true,
        },
    },
];