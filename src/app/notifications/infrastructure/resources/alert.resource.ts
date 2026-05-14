import { BaseResource } from '../../../shared/infrastructure/resources/base.resource';
import { AlertLevel } from '../../domain/model/alert.entity';

export interface AlertResource extends BaseResource {
  title: string;
  message: string;
  level: AlertLevel;
  createdAt: string;
  read: boolean;
}
