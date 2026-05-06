export type BillingStatusValue = 'ACTIVE' | 'CANCELED' | 'PENDING';

export class BillingStatus {
    private readonly _value: BillingStatusValue;

    constructor(value: BillingStatusValue) {
        this._value = value;
    }

    get value(): BillingStatusValue {
        return this._value;
    }

    isActive(): boolean {
        return this._value === 'ACTIVE';
    }

    isCanceled(): boolean {
        return this._value === 'CANCELED';
    }

    isPending(): boolean {
        return this._value === 'PENDING';
    }
}