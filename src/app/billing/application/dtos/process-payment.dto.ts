import { PlanCode } from '../../domain/model/plan.entity';

export interface ProcessPaymentDto {
  planCode: PlanCode;
  amount: number;
  holderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}
