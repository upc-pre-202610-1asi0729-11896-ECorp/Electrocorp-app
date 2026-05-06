export class EnergyReading {
    private _id: number;
    private _deviceName: string;
    private _watts: number;
    private _recordedAt: string;

    constructor(props: {
        id: number;
        deviceName: string;
        watts: number;
        recordedAt: string;
    }) {
        this._id = props.id;
        this._deviceName = props.deviceName;
        this._watts = props.watts;
        this._recordedAt = props.recordedAt;
    }

    get id(): number {
        return this._id;
    }

    get deviceName(): string {
        return this._deviceName;
    }

    get watts(): number {
        return this._watts;
    }

    get recordedAt(): string {
        return this._recordedAt;
    }
}