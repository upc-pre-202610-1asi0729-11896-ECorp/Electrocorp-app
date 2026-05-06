import { Alert } from '../../domain/model/alert.entity';
import type { AlertResponse } from '../responses/alert.response';
import type { AlertResource } from '../resources/alert.resource';

export class AlertAssembler {
    static toEntity(response: AlertResponse): Alert {
        return new Alert({
            id: response.id,
            title: response.title,
            message: response.message,
            level: response.level,
            createdAt: response.createdAt,
            read: response.read,
        });
    }

    static toResource(alert: Alert): AlertResource {
        return {
            title: alert.title,
            message: alert.message,
            level: alert.level,
        };
    }
}