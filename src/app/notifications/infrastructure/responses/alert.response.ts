import { BaseResponse } from '../../../shared/infrastructure/responses/base.response';
import { AlertLevel } from '../../domain/model/alert.entity';

export interface AlertResponse extends BaseResponse<number> {
  title: string;
  message: string;
  level: AlertLevel;
  createdAt: string;
  read: boolean;
}
