import type { AlertLevel } from '../../domain/model/alert.entity';

export interface AlertResponse {
    id: number;
    title: string;
    message: string;
    level: AlertLevel;
    createdAt: string;
    read: boolean;
}