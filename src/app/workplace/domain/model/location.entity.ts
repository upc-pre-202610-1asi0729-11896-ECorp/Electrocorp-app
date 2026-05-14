import { BaseEntity } from '../../../shared/domain/model/base.entity';

export type LocationType = 'HOME' | 'OFFICE' | 'STORE' | 'WAREHOUSE';

export class Location extends BaseEntity<number> {
  private readonly _name: string;
  private readonly _address: string;
  private readonly _city: string;
  private readonly _country: string;
  private readonly _type: LocationType;

  constructor(props: {
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    type: LocationType;
  }) {
    super(props.id);
    this._name = props.name;
    this._address = props.address;
    this._city = props.city;
    this._country = props.country;
    this._type = props.type;
  }

  get name(): string {
    return this._name;
  }

  get address(): string {
    return this._address;
  }

  get city(): string {
    return this._city;
  }

  get country(): string {
    return this._country;
  }

  get type(): LocationType {
    return this._type;
  }

  get fullAddress(): string {
    return `${this._address}, ${this._city}, ${this._country}`;
  }
}
