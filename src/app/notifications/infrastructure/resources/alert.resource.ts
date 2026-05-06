import type { AlertLevel } from '../../domain/model/alert.entity';

export interface AlertResource {
    title: string;
    message: string;
    level: AlertLevel;
}