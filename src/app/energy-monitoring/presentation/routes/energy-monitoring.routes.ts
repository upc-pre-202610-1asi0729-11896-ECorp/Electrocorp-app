import type { RouteRecordRaw } from 'vue-router';

const EnergyDashboardView = () => import('../views/dashboard/EnergyDashboardView.vue');
const EnergyHistoryView = () => import('../views/history/EnergyHistoryView.vue');

export const energyMonitoringRoutes: RouteRecordRaw[] = [
    {
        path: '/energy-monitoring/dashboard',
        name: 'energy-monitoring-dashboard',
        component: EnergyDashboardView,
        meta: {
            title: 'ElectroCorp - Energy Monitoring',
            requiresAuth: true,
        },
    },
    {
        path: '/energy-monitoring/history',
        name: 'energy-monitoring-history',
        component: EnergyHistoryView,
        meta: {
            title: 'ElectroCorp - Energy History',
            requiresAuth: true,
        },
    },
];