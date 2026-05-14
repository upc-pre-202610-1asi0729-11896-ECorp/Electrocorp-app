import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import {
  SupportTicketPriority,
  SupportTicketStatus,
} from '../../domain/model/support-ticket.entity';

export interface SupportTicketResource extends BaseResource {
  userId: number;
  subject: string;
  description: string;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  createdAt: string;
}
