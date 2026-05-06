export class PasswordVo {
    private readonly _value: string;

    constructor(value: string) {
        if (value.trim().length < 6) {
            throw new Error('Password must contain at least 6 characters.');
        }

        this._value = value;
    }

    get value(): string {
        return this._value;
    }
}