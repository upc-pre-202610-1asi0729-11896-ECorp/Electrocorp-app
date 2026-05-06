export type RoutineAction = 'TURN_ON' | 'TURN_OFF';

export class Routine {
    private _id: number;
    private _name: string;
    private _deviceId: number;
    private _action: RoutineAction;
    private _scheduledTime: string;
    private _enabled: boolean;

    constructor(props: {
        id: number;
        name: string;
        deviceId: number;
        action: RoutineAction;
        scheduledTime: string;
        enabled?: boolean;
    }) {
        this._id = props.id;
        this._name = props.name;
        this._deviceId = props.deviceId;
        this._action = props.action;
        this._scheduledTime = props.scheduledTime;
        this._enabled = props.enabled ?? true;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get deviceId(): number {
        return this._deviceId;
    }

    get action(): RoutineAction {
        return this._action;
    }

    get scheduledTime(): string {
        return this._scheduledTime;
    }

    get enabled(): boolean {
        return this._enabled;
    }

    toggleEnabled(): void {
        this._enabled = !this._enabled;
    }
}