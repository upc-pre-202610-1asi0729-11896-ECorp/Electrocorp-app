import { BaseEntity } from '../../../shared/domain/model/base.entity';

export class AccessProfile extends BaseEntity<number> {
  private readonly _name: string;
  private readonly _permissions: string[];

  constructor(props: {
    id: number;
    name: string;
    permissions: string[];
  }) {
    super(props.id);
    this._name = props.name;
    this._permissions = props.permissions;
  }

  get name(): string {
    return this._name;
  }

  get permissions(): string[] {
    return this._permissions;
  }

  hasPermission(permission: string): boolean {
    return this._permissions.includes(permission);
  }
}
