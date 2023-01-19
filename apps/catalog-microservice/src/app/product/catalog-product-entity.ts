import {
    InternalProductCreateEventContract,
    InternalProductRemoveEventContract,
    InternalProductUpdateEventContract,
} from '@jerky/contracts';
import { IProductUpdate, TEntityBase, TProduct } from '@jerky/interfaces';
import { Product } from '@prisma/client/scripts/catalog-client';

import { CatalogEntityBase } from '../../common';

export class CatalogProductEntity
    extends CatalogEntityBase
    implements TEntityBase<Product, TProduct>
{
    private _price: number;

    constructor(props: TProduct) {
        super(props);
        if (props.price) this.setPrice(props.price);

        return this;
    }
    get price(): number {
        return this._price;
    }

    public setPrice(newPrice: number): void {
        this._price = newPrice;
    }

    public update(props: IProductUpdate): CatalogProductEntity {
        this.updateBase(props);

        if (props.price) this.setPrice(props.price);

        return this;
    }
    public createEvent(created: Product, props: unknown): void {
        this.publishEvent(InternalProductCreateEventContract.topic, {
            created,
            props: props,
        });
    }
    public updateEvent(
        existed: Product,
        updated: Product,
        props: unknown,
    ): void {
        this.publishEvent(InternalProductUpdateEventContract.topic, {
            existed,
            updated,
            props: props,
        });
    }
    public removeEvent(removed: Product, props: unknown): void {
        this.publishEvent(InternalProductRemoveEventContract.topic, {
            removed,
            props: props,
        });
    }
}
