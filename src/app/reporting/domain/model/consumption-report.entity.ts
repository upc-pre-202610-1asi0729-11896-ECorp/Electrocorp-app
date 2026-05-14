import { BaseEntity } from '../../../shared/domain/model/base.entity';

export class ConsumptionReport extends BaseEntity<number> {
  private readonly _userId: number;
  private readonly _startDate: string;
  private readonly _endDate: string;
  private readonly _totalWatts: number;
  private readonly _averageWatts: number;
  private readonly _highestReading: number;
  private readonly _recommendation: string;

  constructor(props: {
    id: number;
    userId: number;
    startDate: string;
    endDate: string;
    totalWatts: number;
    averageWatts: number;
    highestReading: number;
    recommendation: string;
  }) {
    super(props.id);
    this._userId = props.userId;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._totalWatts = props.totalWatts;
    this._averageWatts = props.averageWatts;
    this._highestReading = props.highestReading;
    this._recommendation = props.recommendation;
  }

  get userId(): number {
    return this._userId;
  }

  get startDate(): string {
    return this._startDate;
  }

  get endDate(): string {
    return this._endDate;
  }

  get totalWatts(): number {
    return this._totalWatts;
  }

  get averageWatts(): number {
    return this._averageWatts;
  }

  get highestReading(): number {
    return this._highestReading;
  }

  get recommendation(): string {
    return this._recommendation;
  }

  get period(): string {
    return `${this._startDate} - ${this._endDate}`;
  }
}
