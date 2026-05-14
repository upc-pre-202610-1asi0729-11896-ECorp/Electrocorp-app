import { BaseAssembler } from '../../../shared/infrastructure/assemblers/base.assembler';
import { MaintenanceTicket } from '../../domain/model/maintenance-ticket.entity';
import { MaintenanceTicketResource } from '../resources/maintenance-ticket.resource';
import { MaintenanceTicketResponse } from '../responses/maintenance-ticket.response';

export class MaintenanceTicketAssembler extends BaseAssembler<
  MaintenanceTicket,
  MaintenanceTicketResource,
  MaintenanceTicketResponse
> {
  override toEntity(response: MaintenanceTicketResponse): MaintenanceTicket {
    return new MaintenanceTicket({
      id: response.id,
      deviceId: response.deviceId,
      title: response.title,
      description: response.description,
      status: response.status,
      scheduledAt: response.scheduledAt,
    });
  }

  override toResource(entity: MaintenanceTicket): MaintenanceTicketResource {
    return {
      deviceId: entity.deviceId,
      title: entity.title,
      description: entity.description,
      status: entity.status,
      scheduledAt: entity.scheduledAt,
    };
  }
}
