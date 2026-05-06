import { Plan } from '../../domain/model/plan.entity';
import type { PlanResponse } from '../responses/plan.response';

export class PlanAssembler {
    static toEntity(response: PlanResponse): Plan {
        return new Plan({
            id: response.id,
            code: response.code,
            name: response.name,
            monthlyPrice: response.monthlyPrice,
            features: response.features,
        });
    }
}