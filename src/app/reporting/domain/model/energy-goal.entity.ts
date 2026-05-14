import { BaseEntity } from '../../../shared/domain/model/base.entity';

export type EnergyGoalStatus = 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export class EnergyGoal extends BaseEntity<number> {
  private readonly _userId: number;
  private readonly _title: string;
  private readonly _targetWatts: number;
  private readonly _currentWatts: number;
  private readonly _startDate: string;
  private readonly _endDate: string;
  private readonly _status: EnergyGoalStatus;

  constructor(props: {
    id: number;
    userId: number;
    title: string;
    targetWatts: number;
    currentWatts: number;
    startDate: string;
    endDate: string;
    status: EnergyGoalStatus;
  }) {
    super(props.id);
    this._userId = props.userId;
    this._title = props.title;
    this._targetWatts = props.targetWatts;
    this._currentWatts = props.currentWatts;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._status = props.status;
  }

  get userId(): number {
    return this._userId;
  }

  get title(): string {
    return this._title;
  }

  get targetWatts(): number {
    return this._targetWatts;
  }

  get currentWatts(): number {
    return this._currentWatts;
  }

  get startDate(): string {
    return this._startDate;
  }

  get endDate(): string {
    return this._endDate;
  }

  get status(): EnergyGoalStatus {
    return this._status;
  }

  get progressPercentage(): number {
    if (this._targetWatts <= 0) return 0;

    const progress = (this._currentWatts / this._targetWatts) * 100;
    return Math.min(Math.round(progress), 100);
  }

  get remainingWatts(): number {
    return Math.max(this._targetWatts - this._currentWatts, 0);
  }
}
