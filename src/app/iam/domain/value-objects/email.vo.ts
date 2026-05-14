export class EmailVo {
    private readonly _value: string;

    constructor(value: string) {
        const normalizedValue = value.trim().toLowerCase();

        if (!this.isValidEmail(normalizedValue)) {
            throw new Error('Invalid email format.');
        }

        this._value = normalizedValue;
    }

    get value(): string {
        return this._value;
    }

    private isValidEmail(value: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
}