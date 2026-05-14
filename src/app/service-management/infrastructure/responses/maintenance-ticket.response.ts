import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';
import { MaintenanceTicketStatus } from '../../domain/model/maintenance-ticket.entity';

export interface MaintenanceTicketResponse extends BaseResponse<number> {
  deviceId: number;
  title: string;
  description: string;
  status: MaintenanceTicketStatus;
  scheduledAt: string;
}
