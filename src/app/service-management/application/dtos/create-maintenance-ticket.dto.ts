import { MaintenanceTicketStatus } from '../../domain/model/maintenance-ticket.entity';

export interface CreateMaintenanceTicketDto {
  deviceId: number;
  title: string;
  description: string;
  scheduledAt: string;
  status?: MaintenanceTicketStatus;
}
