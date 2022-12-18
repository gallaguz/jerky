import { BaseEntity } from '../common';
import { IProductEntity, IProductDto } from '@jerky/interfaces';
import {
    ProductCreateEvent,
    ProductRemoveEvent,
    ProductUpdateEvent,
} from '@jerky/contracts';
import { Product } from '@prisma/client/scripts/catalog-client';

export class ProductEntity extends BaseEntity implements IProductEntity {
    private _price: number;
    private _recipeUuid: string;
    private _recipeTypeUuid: string;
    private _categoryUuid: string;
    private _rawUuid: string;

    constructor(props: IProductDto) {
        super(props.uuid, props.title, props.description);

        if (props.price) this.setPrice(props.price);
        if (props.rawUuid) this.setRawUuid(props.rawUuid);
        if (props.categoryUuid) this.setCategoryUuid(props.categoryUuid);
        if (props.recipeTypeUuid) this.setRecipeTypeUuid(props.recipeTypeUuid);
        if (props.recipeUuid) this.setRecipeUuid(props.recipeUuid);

        return this;
    }

    get price(): number {
        return this._price;
    }

    get recipeUuid(): string {
        return this._recipeUuid;
    }

    get recipeTypeUuid(): string {
        return this._recipeTypeUuid;
    }

    get categoryUuid(): string {
        return this._categoryUuid;
    }

    get rawUuid(): string {
        return this._rawUuid;
    }

    public setPrice(newPrice: number): void {
        this._price = newPrice;
    }

    public setRecipeUuid(recipeUuid: string): void {
        this._recipeUuid = recipeUuid;
    }

    public setRecipeTypeUuid(recipeTypeUuid: string): void {
        this._recipeTypeUuid = recipeTypeUuid;
    }

    public setCategoryUuid(categoryUuid: string): void {
        this._categoryUuid = categoryUuid;
    }

    public setRawUuid(rawUuid: string): void {
        this._rawUuid = rawUuid;
    }

    public update(props: IProductDto): void {
        if (props.title) this.setTitle(props.title);
        if (props.description) this.setDescription(props.description);
        if (props.price) this.setPrice(props.price);
        if (props.rawUuid) this.setRawUuid(props.rawUuid);
        if (props.categoryUuid) this.setCategoryUuid(props.categoryUuid);
        if (props.recipeTypeUuid) this.setRecipeTypeUuid(props.recipeTypeUuid);
        if (props.recipeUuid) this.setRecipeUuid(props.recipeUuid);
    }

    public createEvent(created: Product): void {
        this.publishEvent(ProductCreateEvent.topic, created);
    }

    public updateEvent(existed: Product, updated: Product): void {
        this.publishEvent(ProductUpdateEvent.topic, { existed, updated });
    }

    public removeEvent(removed: Product): void {
        this.publishEvent(ProductRemoveEvent.topic, removed);
    }
}
