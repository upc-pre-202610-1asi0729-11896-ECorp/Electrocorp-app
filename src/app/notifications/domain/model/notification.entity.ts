export type NotificationChannel = 'IN_APP' | 'EMAIL';

export class Notification {
    private readonly _id: number;
    private readonly _subject: string;
    private readonly _body: string;
    private readonly _channel: NotificationChannel;
    private readonly _sentAt: string;

    constructor(props: {
        id: number;
        subject: string;
        body: string;
        channel: NotificationChannel;
        sentAt: string;
    }) {
        this._id = props.id;
        this._subject = props.subject;
        this._body = props.body;
        this._channel = props.channel;
        this._sentAt = props.sentAt;
    }

    get id(): number {
        return this._id;
    }

    get subject(): string {
        return this._subject;
    }

    get body(): string {
        return this._body;
    }

    get channel(): NotificationChannel {
        return this._channel;
    }

    get sentAt(): string {
        return this._sentAt;
    }
}