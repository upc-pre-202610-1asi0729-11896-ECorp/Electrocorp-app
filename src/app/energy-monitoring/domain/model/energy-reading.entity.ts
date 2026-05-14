import { BaseEntity } from '../../../shared/domain/model/base.entity';

export type EnergyReadingStatus = 'NORMAL' | 'HIGH';

export class EnergyReading extends BaseEntity<number> {
  private readonly _deviceName: string;
  private readonly _watts: number;
  private readonly _recordedAt: string;
  private readonly _status: EnergyReadingStatus;

  constructor(props: {
    id: number;
    deviceName: string;
    watts: number;
    recordedAt: string;
    status: EnergyReadingStatus;
  }) {
    super(props.id);
    this._deviceName = props.deviceName;
    this._watts = props.watts;
    this._recordedAt = props.recordedAt;
    this._status = props.status;
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

  get status(): EnergyReadingStatus {
    return this._status;
  }

  get isHigh(): boolean {
    return this._status === 'HIGH' || this._watts >= 120;
  }
}
