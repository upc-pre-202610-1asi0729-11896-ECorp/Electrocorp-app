import { API_BASE_URL } from '../../../shared/infrastructure/api/api-config';
import type { SignInResource } from '../resources/sign-in.resource';
import type { SignUpResource } from '../resources/sign-up.resource';
import type { UserResponse } from '../responses/user.response';
import type { AccessProfileResponse } from '../responses/access-profile.response';

const AUTH_KEY = 'ec.auth';
const USER_EMAIL_KEY = 'ec.user.email';
const USER_NAME_KEY = 'ec.user.name';

type UserWithPasswordResponse = UserResponse & {
    password: string;
};

export class IamApiEndpoint {
    async signIn(resource: SignInResource): Promise<{
        user: UserResponse;
        accessProfiles: AccessProfileResponse[];
    }> {
        const response = await fetch(`${API_BASE_URL}/users`);

        if (!response.ok) {
            throw new Error('Error loading users.');
        }

        const users = (await response.json()) as UserWithPasswordResponse[];

        const user = users.find(
            (item) =>
                item.email.trim().toLowerCase() === resource.email.trim().toLowerCase() &&
                item.password === resource.password
        );

        if (!user) {
            throw new Error('Invalid credentials.');
        }

        const accessProfiles = await this.getDefaultAccessProfiles();

        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(USER_EMAIL_KEY, user.email);
        localStorage.setItem(USER_NAME_KEY, user.fullName);

        return {
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                status: user.status,
            },
            accessProfiles,
        };
    }

    async signUp(resource: SignUpResource): Promise<{
        user: UserResponse;
        accessProfiles: AccessProfileResponse[];
    }> {
        const usersResponse = await fetch(`${API_BASE_URL}/users`);

        if (!usersResponse.ok) {
            throw new Error('Error validating users.');
        }

        const users = (await usersResponse.json()) as UserWithPasswordResponse[];

        const emailAlreadyExists = users.some(
            (item) => item.email.trim().toLowerCase() === resource.email.trim().toLowerCase()
        );

        if (emailAlreadyExists) {
            throw new Error('Email already exists.');
        }

        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Date.now(),
                fullName: resource.fullName,
                email: resource.email,
                password: resource.password,
                status: 'ACTIVE',
            }),
        });

        if (!response.ok) {
            throw new Error('Error signing up.');
        }

        const createdUser = (await response.json()) as UserWithPasswordResponse;
        const accessProfiles = await this.getDefaultAccessProfiles();

        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(USER_EMAIL_KEY, createdUser.email);
        localStorage.setItem(USER_NAME_KEY, createdUser.fullName);

        return {
            user: {
                id: createdUser.id,
                fullName: createdUser.fullName,
                email: createdUser.email,
                status: createdUser.status,
            },
            accessProfiles,
        };
    }

    async restoreSession(): Promise<{
        user: UserResponse;
        accessProfiles: AccessProfileResponse[];
    } | null> {
        const auth = localStorage.getItem(AUTH_KEY);
        const email = localStorage.getItem(USER_EMAIL_KEY);

        if (auth !== 'true' || !email) {
            return null;
        }

        const response = await fetch(`${API_BASE_URL}/users`);

        if (!response.ok) {
            return null;
        }

        const users = (await response.json()) as UserWithPasswordResponse[];

        const user = users.find(
            (item) => item.email.trim().toLowerCase() === email.trim().toLowerCase()
        );

        if (!user) {
            return null;
        }

        const accessProfiles = await this.getDefaultAccessProfiles();

        return {
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                status: user.status,
            },
            accessProfiles,
        };
    }

    async signOut(): Promise<void> {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(USER_EMAIL_KEY);
        localStorage.removeItem(USER_NAME_KEY);
    }

    private async getDefaultAccessProfiles(): Promise<AccessProfileResponse[]> {
        const response = await fetch(`${API_BASE_URL}/accessProfiles`);

        if (!response.ok) {
            throw new Error('Error loading access profiles.');
        }

        const profiles = (await response.json()) as AccessProfileResponse[];

        return profiles.filter((profile) => profile.name === 'OWNER');
    }
}