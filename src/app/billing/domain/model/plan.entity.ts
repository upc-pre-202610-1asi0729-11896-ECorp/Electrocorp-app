export type PlanCode = 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';

export class Plan {
    private readonly _id: number;
    private readonly _code: PlanCode;
    private readonly _name: string;
    private readonly _monthlyPrice: number;
    private readonly _features: string[];

    constructor(props: {
        id: number;
        code: PlanCode;
        name: string;
        monthlyPrice: number;
        features: string[];
    }) {
        this._id = props.id;
        this._code = props.code;
        this._name = props.name;
        this._monthlyPrice = props.monthlyPrice;
        this._features = props.features;
    }

    get id(): number {
        return this._id;
    }

    get code(): PlanCode {
        return this._code;
    }

    get name(): string {
        return this._name;
    }

    get monthlyPrice(): number {
        return this._monthlyPrice;
    }

    get features(): string[] {
        return this._features;
    }
}