import type { PlanCode } from './plan.entity';

export type SubscriptionStatus = 'ACTIVE' | 'CANCELED';

export class Subscription {
    private readonly _id: number;
    private readonly _planCode: PlanCode;
    private _status: SubscriptionStatus;
    private readonly _startedAt: string;
    private _endsAt: string | null;

    constructor(props: {
        id: number;
        planCode: PlanCode;
        status?: SubscriptionStatus;
        startedAt: string;
        endsAt?: string | null;
    }) {
        this._id = props.id;
        this._planCode = props.planCode;
        this._status = props.status ?? 'ACTIVE';
        this._startedAt = props.startedAt;
        this._endsAt = props.endsAt ?? null;
    }

    get id(): number {
        return this._id;
    }

    get planCode(): PlanCode {
        return this._planCode;
    }

    get status(): SubscriptionStatus {
        return this._status;
    }

    get startedAt(): string {
        return this._startedAt;
    }

    get endsAt(): string | null {
        return this._endsAt;
    }

    cancel(endsAt: string): void {
        this._status = 'CANCELED';
        this._endsAt = endsAt;
    }
}