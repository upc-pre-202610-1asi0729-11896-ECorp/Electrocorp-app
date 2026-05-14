export type AlertLevel = 'INFO' | 'WARNING' | 'CRITICAL';

export class Alert {
    private readonly _id: number;
    private readonly _title: string;
    private readonly _message: string;
    private readonly _level: AlertLevel;
    private readonly _createdAt: string;
    private _read: boolean;

    constructor(props: {
        id: number;
        title: string;
        message: string;
        level: AlertLevel;
        createdAt: string;
        read?: boolean;
    }) {
        this._id = props.id;
        this._title = props.title;
        this._message = props.message;
        this._level = props.level;
        this._createdAt = props.createdAt;
        this._read = props.read ?? false;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get message(): string {
        return this._message;
    }

    get level(): AlertLevel {
        return this._level;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    get read(): boolean {
        return this._read;
    }

    markAsRead(): void {
        this._read = true;
    }
}