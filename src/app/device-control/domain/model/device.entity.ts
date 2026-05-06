export type DeviceStatus = 'ON' | 'OFF';
export type DeviceType = 'SMART_PLUG' | 'SMART_SWITCH' | 'LIGHT';

export class Device {
    private _id: number;
    private _name: string;
    private _type: DeviceType;
    private _status: DeviceStatus;
    private _room: string;
    private _powerWatts: number;

    constructor(props: {
        id: number;
        name: string;
        type: DeviceType;
        status?: DeviceStatus;
        room: string;
        powerWatts: number;
    }) {
        this._id = props.id;
        this._name = props.name;
        this._type = props.type;
        this._status = props.status ?? 'OFF';
        this._room = props.room;
        this._powerWatts = props.powerWatts;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): DeviceType {
        return this._type;
    }

    get status(): DeviceStatus {
        return this._status;
    }

    set status(value: DeviceStatus) {
        this._status = value;
    }

    get room(): string {
        return this._room;
    }

    set room(value: string) {
        this._room = value;
    }

    get powerWatts(): number {
        return this._powerWatts;
    }

    turnOn(): void {
        this._status = 'ON';
    }

    turnOff(): void {
        this._status = 'OFF';
    }

    toggle(): void {
        this._status = this._status === 'ON' ? 'OFF' : 'ON';
    }
}