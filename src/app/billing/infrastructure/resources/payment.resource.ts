import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { PlanCode } from '../../domain/model/plan.entity';
import {
  PaymentMethod,
  PaymentStatus,
} from '../../domain/model/payment.entity';

export interface PaymentResource extends BaseResource {
  userId: number;
  planCode: PlanCode;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
  cardLastFourDigits: string;
  holderName: string;
}
