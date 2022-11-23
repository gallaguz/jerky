import { IIngredientEntity, IIngredientProps } from '@jerky/interfaces';
import {
    IngredientCreateEvent,
    IngredientRemoveEvent,
    IngredientUpdateEvent,
} from '@jerky/contracts';
import { BaseEntity } from '../common/base.entity';

export class IngredientEntity extends BaseEntity implements IIngredientEntity {
    private _price: number;

    constructor(uuid?: string, props?: IIngredientProps) {
        super(uuid, props?.title, props?.description);

        if (props?.price) this._price = props.price;

        return this;
    }

    get price(): number {
        return this._price;
    }

    public setPrice(newPrice: number): void {
        this._price = newPrice;
    }

    public update(props: IIngredientProps): void {
        if (props?.title) this.setTitle(props.title);
        if (props?.description) this.setDescription(props.description);
        if (props?.price) this.setPrice(props.price);
    }

    public createEvent(props: IIngredientProps): void {
        this.publishEvent(IngredientCreateEvent.topic, props);
    }

    public updateEvent(props: IIngredientProps): void {
        this.publishEvent(IngredientUpdateEvent.topic, props);
    }

    public removeEvent(): void {
        this.publishEvent(IngredientRemoveEvent.topic);
    }

    public override toJSON(): IIngredientEntity {
        return {
            uuid: this.uuid,
            price: this.price,
            title: this.title,
            description: this.description,
        };
    }
}
