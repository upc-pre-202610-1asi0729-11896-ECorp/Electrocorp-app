import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { MaintenanceTicketStatus } from '../../domain/model/maintenance-ticket.entity';

export interface MaintenanceTicketResource extends BaseResource {
  deviceId: number;
  title: string;
  description: string;
  status: MaintenanceTicketStatus;
  scheduledAt: string;
}
