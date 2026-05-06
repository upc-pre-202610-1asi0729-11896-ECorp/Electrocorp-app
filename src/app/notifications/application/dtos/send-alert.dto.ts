import type { AlertLevel } from '../../domain/model/alert.entity';

export interface SendAlertDto {
    title: string;
    message: string;
    level: AlertLevel;
}