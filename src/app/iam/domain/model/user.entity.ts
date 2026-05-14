import { BaseEntity } from '../../../shared/domain/model/base.entity';

export type UserStatus = 'ACTIVE' | 'BLOCKED';

export class User extends BaseEntity<number> {
  private readonly _fullName: string;
  private readonly _email: string;
  private readonly _status: UserStatus;

  constructor(props: {
    id: number;
    fullName: string;
    email: string;
    status: UserStatus;
  }) {
    super(props.id);
    this._fullName = props.fullName;
    this._email = props.email;
    this._status = props.status;
  }

  get fullName(): string {
    return this._fullName;
  }

  get email(): string {
    return this._email;
  }

  get status(): UserStatus {
    return this._status;
  }

  get isActive(): boolean {
    return this._status === 'ACTIVE';
  }
}
