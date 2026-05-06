import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { iamRoutes } from '../app/iam/presentation/routes/iam.routes';
import { billingRoutes } from '../app/billing/presentation/routes/billing.routes';
import { deviceControlRoutes } from '../app/device-control/presentation/routes/device-control.routes';
import { energyMonitoringRoutes } from '../app/energy-monitoring/presentation/routes/energy-monitoring.routes';
import { useIamStore } from '../app/iam/application/stores/iam.store';
import { notificationsRoutes } from '../app/notifications/presentation/routes/notifications.routes';

const HomeView = () => import('../app/shared/presentation/views/home/HomeView.vue');
const AboutView = () => import('../app/shared/presentation/views/about/AboutView.vue');
const NotFoundView = () => import('../app/shared/presentation/views/not-found/NotFoundView.vue');

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/iam/login',
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta: {
            title: 'ElectroCorp - Home',
            requiresAuth: true,
        },
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
        meta: {
            title: 'ElectroCorp - About',
            requiresAuth: true,
        },
    },
    ...iamRoutes,
    ...deviceControlRoutes,
    ...energyMonitoringRoutes,
    ...billingRoutes,
    ...notificationsRoutes,
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundView,
        meta: {
            title: 'ElectroCorp - Page Not Found',
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    const iamStore = useIamStore();

    iamStore.restoreSession();

    if (to.meta.requiresAuth && !iamStore.isAuthenticated) {
        return '/iam/login';
    }

    if (to.meta.guestOnly && iamStore.isAuthenticated) {
        return '/home';
    }

    return true;
});

router.afterEach((to) => {
    document.title = (to.meta.title as string) || 'ElectroCorp';
});

export default router;