import {
    InternalRecipeCreateEventContract,
    InternalRecipeRemoveEventContract,
    InternalRecipeUpdateEventContract,
} from '@jerky/contracts';
import { TEntityBase, TRecipe, TRecipeUpdate } from '@jerky/interfaces';
import { Recipe } from '@prisma/client/scripts/catalog-client';

import { CatalogEntityBase } from '../../common';

export class CatalogRecipeEntity
    extends CatalogEntityBase
    implements TEntityBase<Recipe, TRecipe>
{
    constructor(props: TRecipe) {
        super(props);

        return this;
    }

    public update(props: TRecipeUpdate): CatalogRecipeEntity {
        this.updateBase(props);

        return this;
    }
    public createEvent(created: Recipe, props: unknown): void {
        this.publishEvent(InternalRecipeCreateEventContract.topic, {
            created,
            props: props,
        });
    }
    public updateEvent(existed: Recipe, updated: Recipe, props: unknown): void {
        this.publishEvent(InternalRecipeUpdateEventContract.topic, {
            existed,
            updated,
            props: props,
        });
    }

    public removeEvent(removed: Recipe, props: unknown): void {
        this.publishEvent(InternalRecipeRemoveEventContract.topic, {
            removed,
            props: props,
        });
    }
}
