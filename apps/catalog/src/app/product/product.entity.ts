import { BaseEntity } from '../common/base.entity';
import { IProductEntity, IProductProps } from '@jerky/interfaces';
import {
    ProductCreateEvent,
    ProductRemoveEvent,
    ProductUpdateEvent,
} from '@jerky/contracts';

export class ProductEntity extends BaseEntity implements IProductEntity {
    private _price: number;

    constructor(uuid?: string, props?: IProductProps) {
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

    public createEvent(props: IProductProps): void {
        this.publishEvent(ProductCreateEvent.topic, props);
    }

    public update(props: IProductProps): void {
        if (props?.title) this.setTitle(props.title);
        if (props?.description) this.setDescription(props.description);
        if (props?.price) this.setPrice(props.price);
    }

    public updateEvent(props: IProductProps): void {
        this.publishEvent(ProductUpdateEvent.topic, props);
    }

    public removeEvent(): void {
        this.publishEvent(ProductRemoveEvent.topic);
    }

    public override toJSON(): IProductEntity {
        return {
            uuid: this.uuid,
            price: this.price,
            title: this.title,
            description: this.description,
        };
    }
}
