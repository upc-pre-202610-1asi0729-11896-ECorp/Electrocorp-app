import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { PlanCode } from '../../domain/model/plan.entity';

export interface PlanResource extends BaseResource {
  code: PlanCode;
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
}
