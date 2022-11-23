import { IDomainEvent } from '@jerky/interfaces';
import * as crypto from 'crypto';

export interface IBaseEntityProps {
    title?: string | null;
    description?: string | null;
}

export interface IBaseEntity {
    uuid: string;
    title: string;
    description: string;
}

export class BaseEntity {
    private readonly _uuid: string;
    private _title: string;
    private _description: string;
    private _events: IDomainEvent[] = [];

    constructor(
        uuid?: string,
        title?: string | null,
        description?: string | null,
    ) {
        this._uuid = uuid ?? crypto.randomUUID();

        if (title) this.setTitle(title);
        if (description) this.setDescription(description);
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

    get uuid(): string {
        return this._uuid;
    }

    get title(): string {
        return this._title;
    }
    get description(): string {
        return this._description;
    }

    public setTitle(newTitle: string): void {
        this._title = newTitle;
    }

    public setDescription(newDescription: string): void {
        this._title = newDescription;
    }

    public toJSON(): IBaseEntity {
        return {
            uuid: this.uuid,
            title: this.title,
            description: this.description,
        };
    }
}
