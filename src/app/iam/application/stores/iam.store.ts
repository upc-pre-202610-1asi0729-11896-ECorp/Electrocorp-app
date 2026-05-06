import { defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';
import type { User } from '../../domain/model/user.entity';
import type { AccessProfile } from '../../domain/model/access-profile.entity';
import type { SignInDto } from '../dtos/sign-in.dto';
import type { SignUpDto } from '../dtos/sign-up.dto';
import { IamFacade } from '../services/iam.facade';
import { PasswordPolicyService } from '../../domain/services/password-policy.service';

export const useIamStore = defineStore('iam', () => {
    const facade = new IamFacade();
    const passwordPolicyService = new PasswordPolicyService();

    const currentUser = shallowRef<User | null>(null);
    const accessProfiles = shallowRef<AccessProfile[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => currentUser.value !== null);

    async function signIn(payload: SignInDto): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            if (!passwordPolicyService.isValid(payload.password)) {
                error.value = passwordPolicyService.getMessage();
                return;
            }

            const response = await facade.signIn(payload);
            currentUser.value = response.user;
            accessProfiles.value = response.accessProfiles;
        } catch {
            error.value = 'No se pudo iniciar sesión.';
        } finally {
            loading.value = false;
        }
    }

    async function signUp(payload: SignUpDto): Promise<void> {
        loading.value = true;
        error.value = null;

        try {
            if (!passwordPolicyService.isValid(payload.password)) {
                error.value = passwordPolicyService.getMessage();
                return;
            }

            const response = await facade.signUp(payload);
            currentUser.value = response.user;
            accessProfiles.value = response.accessProfiles;
        } catch {
            error.value = 'No se pudo registrar el usuario.';
        } finally {
            loading.value = false;
        }
    }

    async function signOut(): Promise<void> {
        await facade.signOut();

        currentUser.value = null;
        accessProfiles.value = [];
    }

    async function restoreSession(): Promise<void> {
        const response = await facade.restoreSession();

        if (!response) return;

        currentUser.value = response.user;
        accessProfiles.value = response.accessProfiles;
    }

    return {
        currentUser,
        accessProfiles,
        loading,
        error,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        restoreSession,
    };
});