import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';
import { PlanCode } from '../../domain/model/plan.entity';
import {
  PaymentMethod,
  PaymentStatus,
} from '../../domain/model/payment.entity';

export interface PaymentResponse extends BaseResponse<number> {
  userId: number;
  planCode: PlanCode;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
  cardLastFourDigits: string;
  holderName: string;
}
