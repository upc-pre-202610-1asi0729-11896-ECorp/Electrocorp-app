import type { NotificationChannel } from '../model/notification.entity';

export class NotificationChannelVo {
    private readonly _value: NotificationChannel;

    constructor(value: NotificationChannel) {
        this._value = value;
    }

    get value(): NotificationChannel {
        return this._value;
    }

    isEmail(): boolean {
        return this._value === 'EMAIL';
    }

    isInApp(): boolean {
        return this._value === 'IN_APP';
    }
}