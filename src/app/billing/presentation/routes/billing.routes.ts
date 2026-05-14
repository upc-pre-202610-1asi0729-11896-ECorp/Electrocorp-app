import type { RouteRecordRaw } from 'vue-router';

const PlansView = () => import('../views/plans/PlansView.vue');

export const billingRoutes: RouteRecordRaw[] = [
    {
        path: '/billing/plans',
        name: 'billing-plans',
        component: PlansView,
        meta: {
            title: 'ElectroCorp - Plans',
            requiresAuth: true,
        },
    },
];