import {
  SupportTicketPriority,
  SupportTicketStatus,
} from '../../domain/model/support-ticket.entity';

export interface CreateSupportTicketDto {
  subject: string;
  description: string;
  priority: SupportTicketPriority;
  status?: SupportTicketStatus;
}
