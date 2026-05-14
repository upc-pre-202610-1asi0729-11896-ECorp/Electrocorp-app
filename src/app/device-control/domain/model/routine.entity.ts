import { BaseEntity } from '../../../shared/domain/model/base.entity';

export type RoutineAction = 'TURN_ON' | 'TURN_OFF';

export class Routine extends BaseEntity<number> {
  private readonly _name: string;
  private readonly _deviceId: number;
  private readonly _action: RoutineAction;
  private readonly _scheduledTime: string;
  private _enabled: boolean;

  constructor(props: {
    id: number;
    name: string;
    deviceId: number;
    action: RoutineAction;
    scheduledTime: string;
    enabled: boolean;
  }) {
    super(props.id);
    this._name = props.name;
    this._deviceId = props.deviceId;
    this._action = props.action;
    this._scheduledTime = props.scheduledTime;
    this._enabled = props.enabled;
  }

  get name(): string {
    return this._name;
  }

  get deviceId(): number {
    return this._deviceId;
  }

  get action(): RoutineAction {
    return this._action;
  }

  get scheduledTime(): string {
    return this._scheduledTime;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  toggleEnabled(): void {
    this._enabled = !this._enabled;
  }
}
