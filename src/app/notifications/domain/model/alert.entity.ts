import { BaseEntity } from '../../../shared/domain/model/base.entity';

export type AlertLevel = 'INFO' | 'WARNING' | 'CRITICAL';

export class Alert extends BaseEntity<number> {
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
    read: boolean;
  }) {
    super(props.id);
    this._title = props.title;
    this._message = props.message;
    this._level = props.level;
    this._createdAt = props.createdAt;
    this._read = props.read;
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

  get unread(): boolean {
    return !this._read;
  }

  markAsRead(): void {
    this._read = true;
  }
}
