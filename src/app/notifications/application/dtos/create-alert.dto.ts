import { AlertLevel } from '../../domain/model/alert.entity';

export interface CreateAlertDto {
  title: string;
  message: string;
  level: AlertLevel;
}
