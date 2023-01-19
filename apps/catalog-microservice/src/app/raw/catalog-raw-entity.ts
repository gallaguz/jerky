import {
    InternalRawCreateEventContract,
    InternalRawRemoveEventContract,
    InternalRawUpdateEventContract,
} from '@jerky/contracts';
import { TEntityBase, TRaw, TRawUpdate } from '@jerky/interfaces';
import { Raw } from '@prisma/client/scripts/catalog-client';

import { CatalogEntityBase } from '../../common';

export class CatalogRawEntity
    extends CatalogEntityBase
    implements TEntityBase<Raw, TRaw>
{
    private _price: number;
    private _payload: number;
    constructor(props: TRaw) {
        super(props);

        if (props.price) this.setPrice(props.price);
        if (props.payload) this.setPayload(props.payload);

        return this;
    }

    get payload(): number {
        return this._payload;
    }
    public setPayload(payload?: number): void {
        this._payload = payload ?? 1;
    }
    get price(): number {
        return this._price;
    }
    public setPrice(newPrice: number): void {
        this._price = newPrice;
    }
    public update(props: TRawUpdate): CatalogRawEntity {
        this.updateBase(props);

        if (props.price) this.setPrice(props.price);
        if (props.payload) this.setPayload(props.payload);

        return this;
    }
    public createEvent(created: Raw, props: unknown): void {
        this.publishEvent(InternalRawCreateEventContract.topic, {
            created,
            props: props,
        });
    }
    public updateEvent(existed: Raw, updated: Raw, props: unknown): void {
        this.publishEvent(InternalRawUpdateEventContract.topic, {
            existed,
            updated,
            props: props,
        });
    }
    public removeEvent(removed: Raw, props: unknown): void {
        this.publishEvent(InternalRawRemoveEventContract.topic, {
            removed,
            props: props,
        });
    }
}
