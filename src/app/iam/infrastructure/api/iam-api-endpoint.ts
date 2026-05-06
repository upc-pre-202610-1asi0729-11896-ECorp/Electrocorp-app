import type { SignInResource } from '../resources/sign-in.resource';
import type { SignUpResource } from '../resources/sign-up.resource';
import type { UserResponse } from '../responses/user.response';
import type { AccessProfileResponse } from '../responses/access-profile.response';

const AUTH_KEY = 'ec.auth';
const USER_EMAIL_KEY = 'ec.user.email';
const USER_NAME_KEY = 'ec.user.name';

export class IamApiEndpoint {
    async signIn(resource: SignInResource): Promise<{
        user: UserResponse;
        accessProfiles: AccessProfileResponse[];
    }> {
        const fullName = localStorage.getItem(USER_NAME_KEY) ?? 'ElectroCorp User';

        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(USER_EMAIL_KEY, resource.email);
        localStorage.setItem(USER_NAME_KEY, fullName);

        return {
            user: {
                id: 1,
                fullName,
                email: resource.email,
                status: 'ACTIVE',
            },
            accessProfiles: [
                {
                    id: 1,
                    name: 'OWNER',
                    permissions: ['MANAGE_DEVICES', 'VIEW_ANALYTICS', 'MANAGE_BILLING'],
                },
            ],
        };
    }

    async signUp(resource: SignUpResource): Promise<{
        user: UserResponse;
        accessProfiles: AccessProfileResponse[];
    }> {
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(USER_EMAIL_KEY, resource.email);
        localStorage.setItem(USER_NAME_KEY, resource.fullName);

        return {
            user: {
                id: Date.now(),
                fullName: resource.fullName,
                email: resource.email,
                status: 'ACTIVE',
            },
            accessProfiles: [
                {
                    id: 1,
                    name: 'OWNER',
                    permissions: ['MANAGE_DEVICES', 'VIEW_ANALYTICS', 'MANAGE_BILLING'],
                },
            ],
        };
    }

    async restoreSession(): Promise<{
        user: UserResponse;
        accessProfiles: AccessProfileResponse[];
    } | null> {
        const auth = localStorage.getItem(AUTH_KEY);
        const email = localStorage.getItem(USER_EMAIL_KEY);
        const fullName = localStorage.getItem(USER_NAME_KEY);

        if (auth !== 'true' || !email || !fullName) {
            return null;
        }

        return {
            user: {
                id: 1,
                fullName,
                email,
                status: 'ACTIVE',
            },
            accessProfiles: [
                {
                    id: 1,
                    name: 'OWNER',
                    permissions: ['MANAGE_DEVICES', 'VIEW_ANALYTICS', 'MANAGE_BILLING'],
                },
            ],
        };
    }

    async signOut(): Promise<void> {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(USER_EMAIL_KEY);
        localStorage.removeItem(USER_NAME_KEY);
    }
}