export class Watts {
    private readonly _value: number;

    constructor(value: number) {
        if (value < 0) {
            throw new Error('Watts value cannot be negative.');
        }

        this._value = value;
    }

    get value(): number {
        return this._value;
    }

    isHighConsumption(threshold: number): boolean {
        return this._value >= threshold;
    }

    toLabel(): string {
        return `${this._value}W`;
    }
}