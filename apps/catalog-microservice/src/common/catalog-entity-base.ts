import {
    IDomainEvent,
    TCatalogModelBase,
    TCatalogUpdateBase,
} from '@jerky/interfaces';

export abstract class CatalogEntityBase {
    private readonly _uuid: string;
    private _alias: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _title: string;
    private _description?: string;
    private _events: IDomainEvent[] = [];

    protected constructor(props: TCatalogModelBase) {
        if (props.uuid) this._uuid = props.uuid;
        if (props.createdAt) this._createdAt = props.createdAt;
        if (props.updatedAt) this._updatedAt = props.updatedAt;
        if (props.alias) this._alias = props.alias;
        if (props.title) this._title = props.title;
        if (props.description) this._description = props.description;
    }

    public updateBase(props: TCatalogUpdateBase): void {
        if (props.createdAt) this.setCreatedAt(props.createdAt);
        if (props.updatedAt) this.setUpdatedAt(props.updatedAt);
        if (props.alias) this.setAlias(props.alias);
        if (props.title) this.setTitle(props.title);
        if (props.description) this.setDescription(props.description);
    }

    public get events(): IDomainEvent[] {
        return this._events;
    }
    protected publishEvent(topic: string, data?: unknown): void {
        const event: IDomainEvent = {
            topic,
            data,
        };
        this._events.push(event);
    }

    get uuid(): string {
        return this._uuid;
    }
    get createdAt(): Date {
        return this._createdAt;
    }
    get updatedAt(): Date {
        return this._updatedAt;
    }
    get alias(): string {
        return this._alias;
    }
    get title(): string {
        return this._title;
    }
    get description(): string | undefined {
        return this._description;
    }

    public setCreatedAt(createdAt: Date): void {
        this._createdAt = createdAt;
    }
    public setUpdatedAt(updatedAt: Date): void {
        this._updatedAt = updatedAt;
    }
    public setAlias(alias: string): void {
        this._alias = alias;
    }
    public setTitle(newTitle: string): void {
        this._title = newTitle;
    }
    public setDescription(newDescription: string): void {
        this._description = newDescription;
    }
}
