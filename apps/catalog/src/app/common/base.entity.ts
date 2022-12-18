import { IDomainEvent } from '@jerky/interfaces';
import * as crypto from 'crypto';

export abstract class BaseEntity {
    private readonly _uuid: string;
    private _title: string;
    private _description?: string;
    private _events: IDomainEvent[] = [];

    protected constructor(uuid: string, title?: string, description?: string) {
        this._uuid = uuid;
        if (title) this._title = title;
        if (description) this._description = description;
    }

    public get events(): IDomainEvent[] {
        return this._events;
    }

    protected publishEvent(topic: string, data?: unknown): void {
        this._events.push(<IDomainEvent>{
            topic,
            data,
        });
    }

    public generateUuid = (): string => {
        return crypto.randomUUID();
    };

    get uuid(): string {
        return this._uuid;
    }

    get title(): string {
        return this._title;
    }
    get description(): string | undefined {
        return this._description;
    }

    public setTitle(newTitle: string): void {
        this._title = newTitle;
    }

    public setDescription(newDescription: string): void {
        this._description = newDescription;
    }
}
