import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import { Plan } from '../../domain/model/plan.entity';
import { PlanResource } from '../resources/plan.resource';
import { PlanResponse } from '../responses/plan.response';

export class PlanAssembler extends BaseAssembler<
  Plan,
  PlanResource,
  PlanResponse
> {
  override toEntity(response: PlanResponse): Plan {
    return new Plan({
      id: response.id,
      code: response.code,
      name: response.name,
      monthlyPrice: response.monthlyPrice,
      description: response.description,
      features: response.features,
    });
  }

  override toResource(entity: Plan): PlanResource {
    return {
      code: entity.code,
      name: entity.name,
      monthlyPrice: entity.monthlyPrice,
      description: entity.description,
      features: entity.features,
    };
  }
}
