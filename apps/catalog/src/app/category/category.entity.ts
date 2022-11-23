import { ICategoryEntity, ICategoryProps } from '@jerky/interfaces';

import { BaseEntity } from '../common/base.entity';
import {
    CategoryCreateEvent,
    CategoryRemoveEvent,
    CategoryUpdateEvent,
} from '@jerky/contracts';

export class CategoryEntity extends BaseEntity implements ICategoryEntity {
    constructor(uuid?: string, props?: ICategoryProps) {
        super(uuid, props?.title, props?.description);

        return this;
    }

    public update(props: ICategoryProps): void {
        if (props?.title) this.setTitle(props.title);
        if (props?.description) this.setDescription(props.description);
    }

    public createEvent(props: ICategoryProps): void {
        this.publishEvent(CategoryCreateEvent.topic, props);
    }

    public updateEvent(props: ICategoryProps): void {
        this.publishEvent(CategoryUpdateEvent.topic, props);
    }

    public removeEvent(): void {
        this.publishEvent(CategoryRemoveEvent.topic);
    }

    public toJSON(): ICategoryEntity {
        return {
            uuid: this.uuid,
            title: this.title,
            description: this.description,
        };
    }
}
