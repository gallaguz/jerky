import {
    InternalRecipeTypeCreateEventContract,
    InternalRecipeTypeRemoveEventContract,
    InternalRecipeTypeUpdateEventContract,
} from '@jerky/contracts';
import { TEntityBase, TRecipeType, TRecipeTypeUpdate } from '@jerky/interfaces';
import { RecipeType } from '@prisma/client/scripts/catalog-client';

import { CatalogEntityBase } from '../../common';

export class CatalogRecipeTypeEntity
    extends CatalogEntityBase
    implements TEntityBase<RecipeType, TRecipeType>
{
    constructor(props: TRecipeType) {
        super(props);

        return this;
    }
    public update(props: TRecipeTypeUpdate): CatalogRecipeTypeEntity {
        this.updateBase(props);

        return this;
    }
    public createEvent(created: RecipeType, props: unknown): void {
        this.publishEvent(InternalRecipeTypeCreateEventContract.topic, {
            created,
            props: props,
        });
    }
    public updateEvent(
        existed: RecipeType,
        updated: RecipeType,
        props: unknown,
    ): void {
        this.publishEvent(InternalRecipeTypeUpdateEventContract.topic, {
            existed,
            updated,
            props: props,
        });
    }
    public removeEvent(removed: RecipeType, props: unknown): void {
        this.publishEvent(InternalRecipeTypeRemoveEventContract.topic, {
            removed,
            props: props,
        });
    }
}
