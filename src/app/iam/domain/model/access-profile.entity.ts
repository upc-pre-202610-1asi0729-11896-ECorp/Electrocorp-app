export class AccessProfile {
    private _id: number;
    private _name: string;
    private _permissions: string[];

    constructor(props: {
        id: number;
        name: string;
        permissions?: string[];
    }) {
        this._id = props.id;
        this._name = props.name;
        this._permissions = props.permissions ?? [];
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

    get permissions(): string[] {
        return this._permissions;
    }

    set permissions(value: string[]) {
        this._permissions = value;
    }
}