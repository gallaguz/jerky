import { BaseEntity } from '../common/base.entity';
import { IRawEntity, IRawProps } from '@jerky/interfaces';
import {
    RawCreateEvent,
    RawRemoveEvent,
    RawUpdateEvent,
} from '@jerky/contracts';

export class RawEntity extends BaseEntity implements IRawEntity {
    private _price: number;
    private _categoryUuid: string;

    constructor(uuid?: string, props?: IRawProps) {
        super(uuid, props?.title, props?.description);

        if (props?.price) this._price = props.price;
        if (props?.categoryUuid) this._categoryUuid = props.categoryUuid;
        return this;
    }

    get price(): number {
        return this._price;
    }

    get categoryUuid(): string {
        return this._categoryUuid;
    }

    public setCategoryUuid(uuid: string): void {
        this._categoryUuid = uuid;
    }

    public setPrice(newPrice: number): void {
        this._price = newPrice;
    }

    public update(props: IRawProps): void {
        if (props?.title) this.setTitle(props.title);
        if (props?.description) this.setDescription(props.description);
        if (props?.price) this.setPrice(props.price);
        if (props?.categoryUuid) this._categoryUuid = props.categoryUuid;
    }

    public createEvent(props: IRawProps): void {
        this.publishEvent(RawCreateEvent.topic, props);
    }

    public updateEvent(props: IRawProps): void {
        this.publishEvent(RawUpdateEvent.topic, props);
    }

    public removeEvent(): void {
        this.publishEvent(RawRemoveEvent.topic);
    }

    public override toJSON(): IRawEntity {
        return {
            uuid: this.uuid,
            price: this.price,
            title: this.title,
            description: this.description,
            categoryUuid: this.categoryUuid,
        };
    }
}
