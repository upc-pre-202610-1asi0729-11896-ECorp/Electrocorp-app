import { BaseEntity } from '../../../shared/domain/model/base.entity';

export class Room extends BaseEntity<number> {
  private readonly _locationId: number;
  private readonly _name: string;
  private readonly _floor: number;

  constructor(props: {
    id: number;
    locationId: number;
    name: string;
    floor: number;
  }) {
    super(props.id);
    this._locationId = props.locationId;
    this._name = props.name;
    this._floor = props.floor;
  }

  get locationId(): number {
    return this._locationId;
  }

  get name(): string {
    return this._name;
  }

  get floor(): number {
    return this._floor;
  }
}
