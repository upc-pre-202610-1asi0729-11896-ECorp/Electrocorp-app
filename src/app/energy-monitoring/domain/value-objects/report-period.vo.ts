export type ReportPeriodValue = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export class ReportPeriod {
    private readonly _value: ReportPeriodValue;

    constructor(value: ReportPeriodValue) {
        this._value = value;
    }

    get value(): ReportPeriodValue {
        return this._value;
    }

    get label(): string {
        const labels: Record<ReportPeriodValue, string> = {
            DAILY: 'Daily',
            WEEKLY: 'Weekly',
            MONTHLY: 'Monthly',
        };

        return labels[this._value];
    }
}