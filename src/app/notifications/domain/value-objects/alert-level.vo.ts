import type { AlertLevel } from '../model/alert.entity';

export class AlertLevelVo {
    private readonly _value: AlertLevel;

    constructor(value: AlertLevel) {
        this._value = value;
    }

    get value(): AlertLevel {
        return this._value;
    }

    isCritical(): boolean {
        return this._value === 'CRITICAL';
    }

    isWarning(): boolean {
        return this._value === 'WARNING';
    }

    isInfo(): boolean {
        return this._value === 'INFO';
    }
}