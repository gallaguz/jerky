import {
    InternalCategoryCreateEventContract,
    InternalCategoryRemoveEventContract,
    InternalCategoryUpdateEventContract,
} from '@jerky/contracts';
import { TCategory, TCategoryUpdate, TEntityBase } from '@jerky/interfaces';
import { Category } from '@prisma/client/scripts/catalog-client';

import { CatalogEntityBase } from '../../common';

export class CatalogCategoryEntity
    extends CatalogEntityBase
    implements TEntityBase<Category, TCategory>
{
    constructor(props: TCategory) {
        super(props);

        return this;
    }
    public update(props: TCategoryUpdate): CatalogCategoryEntity {
        this.updateBase(props);
        return this;
    }
    public createEvent(created: Category, props: unknown): void {
        this.publishEvent(InternalCategoryCreateEventContract.topic, {
            created,
            props,
        });
    }
    public updateEvent(
        existed: Category,
        updated: Category,
        props: unknown,
    ): void {
        this.publishEvent(InternalCategoryUpdateEventContract.topic, {
            existed,
            updated,
            props,
        });
    }
    public removeEvent(removed: Category, props: unknown): void {
        this.publishEvent(InternalCategoryRemoveEventContract.topic, {
            removed,
            props,
        });
    }
}
