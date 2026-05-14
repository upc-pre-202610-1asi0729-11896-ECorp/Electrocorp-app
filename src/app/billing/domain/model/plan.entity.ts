import { BaseEntity } from '../../../shared/domain/model/base.entity';

export type PlanCode = 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';

export class Plan extends BaseEntity<number> {
  private readonly _code: PlanCode;
  private readonly _name: string;
  private readonly _monthlyPrice: number;
  private readonly _description: string;
  private readonly _features: string[];

  constructor(props: {
    id: number;
    code: PlanCode;
    name: string;
    monthlyPrice: number;
    description: string;
    features: string[];
  }) {
    super(props.id);
    this._code = props.code;
    this._name = props.name;
    this._monthlyPrice = props.monthlyPrice;
    this._description = props.description;
    this._features = props.features;
  }

  get code(): PlanCode {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get monthlyPrice(): number {
    return this._monthlyPrice;
  }

  get description(): string {
    return this._description;
  }

  get features(): string[] {
    return this._features;
  }
}
