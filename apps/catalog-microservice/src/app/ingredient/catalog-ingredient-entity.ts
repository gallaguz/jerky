import {
    InternalIngredientCreateEventContract,
    InternalIngredientRemoveEventContract,
    InternalIngredientUpdateEventContract,
} from '@jerky/contracts';
import { TEntityBase, TIngredient, TIngredientUpdate } from '@jerky/interfaces';
import { Ingredient } from '@prisma/client/scripts/catalog-client';

import { CatalogEntityBase } from '../../common';

export class CatalogIngredientEntity
    extends CatalogEntityBase
    implements TEntityBase<Ingredient, TIngredient>
{
    private _price: number;
    private _payload: number;
    private _type: string;
    constructor(props: TIngredient) {
        super(props);

        if (props.price) this.setPrice(props.price);
        if (props.payload) this.setPayload(props.payload);
        if (props.type) this.setType(props.type);

        return this;
    }
    get price(): number {
        return this._price;
    }
    get payload(): number {
        return this._payload;
    }
    get type(): string {
        return this._type;
    }

    public setPrice(newPrice: number): void {
        this._price = newPrice;
    }
    public setPayload(payload?: number): void {
        this._payload = payload ?? 1;
    }
    public setType(newForm: string): void {
        this._type = newForm;
    }
    public update(props: TIngredientUpdate): CatalogIngredientEntity {
        this.updateBase(props);

        if (props.price) this.setPrice(props.price);
        if (props.payload) this.setPayload(props.payload);
        if (props.type) this.setType(props.type);

        return this;
    }

    public createEvent(created: Ingredient, props: unknown): void {
        this.publishEvent(InternalIngredientCreateEventContract.topic, {
            created,
            props: props,
        });
    }
    public updateEvent(
        existed: Ingredient,
        updated: Ingredient,
        props: unknown,
    ): void {
        this.publishEvent(InternalIngredientUpdateEventContract.topic, {
            existed,
            updated,
            props: props,
        });
    }
    public removeEvent(removed: Ingredient, props: unknown): void {
        this.publishEvent(InternalIngredientRemoveEventContract.topic, {
            removed,
            props: props,
        });
    }
}
