import { PasswordVo } from '../value-objects/password.vo';

export class PasswordPolicyService {
    isValid(password: string): boolean {
        try {
            new PasswordVo(password);
            return true;
        } catch {
            return false;
        }
    }

    getMessage(): string {
        return 'Password must contain at least 6 characters.';
    }
}