export type UserStatusResponse = 'ACTIVE' | 'BLOCKED';

export interface UserResponse {
    id: number;
    fullName: string;
    email: string;
    status: UserStatusResponse;
}