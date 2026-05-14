import { BaseEntity } from '../../../shared/domain/model/base.entity';

export type DeviceType = 'SMART_PLUG' | 'SMART_SWITCH' | 'LIGHT';
export type DeviceStatus = 'ON' | 'OFF';

export class Device extends BaseEntity<number> {
  private readonly _name: string;
  private readonly _room: string;
  private readonly _type: DeviceType;
  private _status: DeviceStatus;
  private readonly _powerWatts: number;

  constructor(props: {
    id: number;
    name: string;
    room: string;
    type: DeviceType;
    status: DeviceStatus;
    powerWatts: number;
  }) {
    super(props.id);
    this._name = props.name;
    this._room = props.room;
    this._type = props.type;
    this._status = props.status;
    this._powerWatts = props.powerWatts;
  }

  get name(): string {
    return this._name;
  }

  get room(): string {
    return this._room;
  }

  get type(): DeviceType {
    return this._type;
  }

  get status(): DeviceStatus {
    return this._status;
  }

  get powerWatts(): number {
    return this._powerWatts;
  }

  get isOn(): boolean {
    return this._status === 'ON';
  }

  toggleStatus(): void {
    this._status = this._status === 'ON' ? 'OFF' : 'ON';
  }
}
