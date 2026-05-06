import { AlertsApiEndpoint } from '../../infrastructure/api/alerts-api-endpoint';
import { AlertAssembler } from '../../infrastructure/assemblers/alert.assembler';
import type { Alert } from '../../domain/model/alert.entity';
import type { SendAlertDto } from '../dtos/send-alert.dto';
import type { MarkNotificationReadDto } from '../dtos/mark-notification-read.dto';

export class NotificationsFacade {
    private readonly alertsApi = new AlertsApiEndpoint();

    async getAlerts(): Promise<Alert[]> {
        const responses = await this.alertsApi.findAll();

        return responses.map(AlertAssembler.toEntity);
    }

    async sendAlert(payload: SendAlertDto): Promise<Alert> {
        const response = await this.alertsApi.create({
            title: payload.title,
            message: payload.message,
            level: payload.level,
        });

        return AlertAssembler.toEntity(response);
    }

    async markAlertAsRead(payload: MarkNotificationReadDto): Promise<Alert | null> {
        const response = await this.alertsApi.markAsRead(payload.alertId);

        if (!response) return null;

        return AlertAssembler.toEntity(response);
    }
}