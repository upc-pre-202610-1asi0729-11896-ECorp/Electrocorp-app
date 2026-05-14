import { BaseEntity } from '../../../shared/domain/model/base.entity';

export type MaintenanceTicketStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export class MaintenanceTicket extends BaseEntity<number> {
  private readonly _deviceId: number;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _status: MaintenanceTicketStatus;
  private readonly _scheduledAt: string;

  constructor(props: {
    id: number;
    deviceId: number;
    title: string;
    description: string;
    status: MaintenanceTicketStatus;
    scheduledAt: string;
  }) {
    super(props.id);
    this._deviceId = props.deviceId;
    this._title = props.title;
    this._description = props.description;
    this._status = props.status;
    this._scheduledAt = props.scheduledAt;
  }

  get deviceId(): number {
    return this._deviceId;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get status(): MaintenanceTicketStatus {
    return this._status;
  }

  get scheduledAt(): string {
    return this._scheduledAt;
  }

  get isPending(): boolean {
    return this._status === 'PENDING' || this._status === 'IN_PROGRESS';
  }

  get isCompleted(): boolean {
    return this._status === 'COMPLETED';
  }
}
