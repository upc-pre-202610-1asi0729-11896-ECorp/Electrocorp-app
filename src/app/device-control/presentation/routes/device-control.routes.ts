import type { RouteRecordRaw } from 'vue-router';

const DevicesView = () => import('../views/devices/DevicesView.vue');
const RoutinesView = () => import('../views/routines/RoutinesView.vue');

export const deviceControlRoutes: RouteRecordRaw[] = [
    {
        path: '/device-control/devices',
        name: 'device-control-devices',
        component: DevicesView,
        meta: {
            title: 'ElectroCorp - Devices',
            requiresAuth: true,
        },
    },
    {
        path: '/device-control/routines',
        name: 'device-control-routines',
        component: RoutinesView,
        meta: {
            title: 'ElectroCorp - Routines',
            requiresAuth: true,
        },
    },
];