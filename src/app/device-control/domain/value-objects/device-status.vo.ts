export type DeviceStatusValue = 'ON' | 'OFF';

export class DeviceStatus {
    private readonly _value: DeviceStatusValue;

    constructor(value: DeviceStatusValue) {
        this._value = value;
    }

    get value(): DeviceStatusValue {
        return this._value;
    }

    isOn(): boolean {
        return this._value === 'ON';
    }

    isOff(): boolean {
        return this._value === 'OFF';
    }

    toggle(): DeviceStatus {
        return new DeviceStatus(this._value === 'ON' ? 'OFF' : 'ON');
    }
}