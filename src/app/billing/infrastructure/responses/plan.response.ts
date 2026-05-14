import type { PlanCode } from '../../domain/model/plan.entity';

export interface PlanResponse {
    id: number;
    code: PlanCode;
    name: string;
    monthlyPrice: number;
    features: string[];
}