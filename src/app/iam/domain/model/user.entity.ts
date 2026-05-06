export class User {
    private _id: number;
    private _fullName: string;
    private _email: string;
    private _status: 'ACTIVE' | 'BLOCKED';

    constructor(props: {
        id: number;
        fullName: string;
        email: string;
        status?: 'ACTIVE' | 'BLOCKED';
    }) {
        this._id = props.id;
        this._fullName = props.fullName;
        this._email = props.email;
        this._status = props.status ?? 'ACTIVE';
    }

    get id(): number {
        return this._id;
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(value: string) {
        this._fullName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get status(): 'ACTIVE' | 'BLOCKED' {
        return this._status;
    }

    set status(value: 'ACTIVE' | 'BLOCKED') {
        this._status = value;
    }
}