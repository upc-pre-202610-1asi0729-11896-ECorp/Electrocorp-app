import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import { Payment } from '../../domain/model/payment.entity';
import { PaymentResource } from '../resources/payment.resource';
import { PaymentResponse } from '../responses/payment.response';

export class PaymentAssembler extends BaseAssembler<
  Payment,
  PaymentResource,
  PaymentResponse
> {
  override toEntity(response: PaymentResponse): Payment {
    return new Payment({
      id: response.id,
      userId: response.userId,
      planCode: response.planCode,
      amount: response.amount,
      method: response.method,
      status: response.status,
      createdAt: response.createdAt,
      cardLastFourDigits: response.cardLastFourDigits,
      holderName: response.holderName,
    });
  }

  override toResource(entity: Payment): PaymentResource {
    return {
      userId: entity.userId,
      planCode: entity.planCode,
      amount: entity.amount,
      method: entity.method,
      status: entity.status,
      createdAt: entity.createdAt,
      cardLastFourDigits: entity.cardLastFourDigits,
      holderName: entity.holderName,
    };
  }
}
