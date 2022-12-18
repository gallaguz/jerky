import { BaseEntity } from '../common';
import { IRawEntity, IRawUpdate } from '@jerky/interfaces';
import {
    RawCreateEvent,
    RawRemoveEvent,
    RawUpdateEventContract,
} from '@jerky/contracts';
import { Raw } from '@prisma/client/scripts/catalog-client';
import { IRawCreate } from '@jerky/interfaces';

export class RawEntity extends BaseEntity implements IRawEntity {
    private _price: number;

    constructor(props: IRawCreate) {
        super(props.uuid, props.title, props.description);

        return this;
    }

    get price(): number {
        return this._price;
    }

    public setPrice(newPrice: number): void {
        this._price = newPrice;
    }

    public update(props: IRawUpdate): void {
        if (props.title) this.setTitle(props.title);
        if (props.description) this.setDescription(props.description);
        if (props.price) this.setPrice(props.price);
    }

    public createEvent(raw: Raw): void {
        this.publishEvent(RawCreateEvent.topic, raw);
    }

    public updateEvent(existed: Raw, updated: Raw): void {
        this.publishEvent(RawUpdateEventContract.topic, {
            existed,
            updated,
        });
    }

    public removeEvent(raw: Raw): void {
        this.publishEvent(RawRemoveEvent.topic, raw);
    }
}
