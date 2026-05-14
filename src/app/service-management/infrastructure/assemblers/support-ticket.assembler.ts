import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import { SupportTicket } from '../../domain/model/support-ticket.entity';
import { SupportTicketResource } from '../resources/support-ticket.resource';
import { SupportTicketResponse } from '../responses/support-ticket.response';

export class SupportTicketAssembler extends BaseAssembler<
  SupportTicket,
  SupportTicketResource,
  SupportTicketResponse
> {
  override toEntity(response: SupportTicketResponse): SupportTicket {
    return new SupportTicket({
      id: response.id,
      userId: response.userId,
      subject: response.subject,
      description: response.description,
      status: response.status,
      priority: response.priority,
      createdAt: response.createdAt,
    });
  }

  override toResource(entity: SupportTicket): SupportTicketResource {
    return {
      userId: entity.userId,
      subject: entity.subject,
      description: entity.description,
      status: entity.status,
      priority: entity.priority,
      createdAt: entity.createdAt,
    };
  }
}
