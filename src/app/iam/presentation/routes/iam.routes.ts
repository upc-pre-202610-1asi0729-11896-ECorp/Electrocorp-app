import type { RouteRecordRaw } from 'vue-router';

const LoginView = () => import('../views/login/LoginView.vue');
const RegisterView = () => import('../views/register/RegisterView.vue');

export const iamRoutes: RouteRecordRaw[] = [
    {
        path: '/iam/login',
        name: 'iam-login',
        component: LoginView,
        meta: {
            title: 'ElectroCorp - Login',
            guestOnly: true,
        },
    },
    {
        path: '/iam/register',
        name: 'iam-register',
        component: RegisterView,
        meta: {
            title: 'ElectroCorp - Register',
            guestOnly: true,
        },
    },
];