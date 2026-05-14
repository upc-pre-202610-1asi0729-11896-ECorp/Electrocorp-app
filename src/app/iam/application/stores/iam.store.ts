import { defineStore } from 'pinia';
import { computed, shallowRef, ref } from 'vue';

import { User } from '../../domain/model/user.entity';
import { AccessProfile } from '../../domain/model/access-profile.entity';

import type { SignInDto } from '../dtos/sign-in.dto';
import type { SignUpDto } from '../dtos/sign-up.dto';

import { IamApiEndpoint } from '../../infrastructure/api/iam-api-endpoint';

export const useIamStore = defineStore('iam', () => {
    const iamApi = new IamApiEndpoint();

    const currentUser = shallowRef<User | null>(null);
    const accessProfiles = shallowRef<AccessProfile[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => currentUser.value !== null);

    async function signIn(payload: SignInDto): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            const response = await iamApi.signIn({
                email: payload.email,
                password: payload.password,
            });

            currentUser.value = new User({
                id: response.user.id,
                fullName: response.user.fullName,
                email: response.user.email,
                status: response.user.status,
            });

            accessProfiles.value = response.accessProfiles.map(
                (profile) =>
                    new AccessProfile({
                        id: profile.id,
                        name: profile.name,
                        permissions: profile.permissions,
                    })
            );
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudo iniciar sesión.';
        } finally {
            loading.value = false;
        }
    }

    async function signUp(payload: SignUpDto): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            const response = await iamApi.signUp({
                fullName: payload.fullName,
                email: payload.email,
                password: payload.password,
            });

            currentUser.value = new User({
                id: response.user.id,
                fullName: response.user.fullName,
                email: response.user.email,
                status: response.user.status,
            });

            accessProfiles.value = response.accessProfiles.map(
                (profile) =>
                    new AccessProfile({
                        id: profile.id,
                        name: profile.name,
                        permissions: profile.permissions,
                    })
            );
        } catch (exception) {
            console.error(exception);
            error.value = 'No se pudo registrar el usuario.';
        } finally {
            loading.value = false;
        }
    }

    async function restoreSession(): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            const response = await iamApi.restoreSession();

            if (!response) return;

            currentUser.value = new User({
                id: response.user.id,
                fullName: response.user.fullName,
                email: response.user.email,
                status: response.user.status,
            });

            accessProfiles.value = response.accessProfiles.map(
                (profile) =>
                    new AccessProfile({
                        id: profile.id,
                        name: profile.name,
                        permissions: profile.permissions,
                    })
            );
        } catch (exception) {
            console.error(exception);
            currentUser.value = null;
            accessProfiles.value = [];
        } finally {
            loading.value = false;
        }
    }

    async function signOut(): Promise<void> {
        await iamApi.signOut();

        currentUser.value = null;
        accessProfiles.value = [];
    }

    return {
        currentUser,
        accessProfiles,
        loading,
        error,
        isAuthenticated,
        signIn,
        signUp,
        restoreSession,
        signOut,
    };
});