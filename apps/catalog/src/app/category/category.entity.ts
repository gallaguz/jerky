import {
    ICategoryCreate,
    ICategoryEntity,
    ICategoryUpdate,
} from '@jerky/interfaces';
import { BaseEntity } from '../common';
import {
    CategoryCreateEventContract,
    CategoryRemoveEvent,
    CategoryUpdateEventContract,
} from '@jerky/contracts';
import { Category } from '@prisma/client/scripts/catalog-client';

export class CategoryEntity extends BaseEntity implements ICategoryEntity {
    constructor(props: ICategoryCreate) {
        super(props.uuid, props.title, props.description);

        return this;
    }

    public update(props: ICategoryUpdate): void {
        if (props.title) this.setTitle(props.title);
        if (props.description) this.setDescription(props.description);
    }

    public createEvent(newCategory: Category): void {
        this.publishEvent(CategoryCreateEventContract.topic, newCategory);
    }

    public updateEvent(existed: Category, updated: Category): void {
        this.publishEvent(CategoryUpdateEventContract.topic, {
            existed,
            updated,
        });
    }

    public removeEvent(category: Category): void {
        this.publishEvent(CategoryRemoveEvent.topic, category);
    }
}
