import { BaseEntity } from '../common';
import {
    IRecipeTypeEntity,
    IRecipeTypeDto,
    IRecipeTypeCreate,
    IRecipeTypeUpdate,
} from '@jerky/interfaces';
import {
    RecipeTypeCreateEvent,
    RecipeTypeRemoveEvent,
    RecipeTypeUpdateEvent,
} from '@jerky/contracts';
import { RecipeType } from '@prisma/client/scripts/catalog-client';

export class RecipeTypeEntity extends BaseEntity implements IRecipeTypeEntity {
    constructor(props: IRecipeTypeCreate) {
        super(props.uuid, props.title, props.description);

        return this;
    }

    public update(props: IRecipeTypeUpdate): void {
        if (props?.title) this.setTitle(props.title);
        if (props?.description) this.setDescription(props.description);
    }

    public createEvent(props: IRecipeTypeDto): void {
        this.publishEvent(RecipeTypeCreateEvent.topic, props);
    }

    public updateEvent(existed: RecipeType, updated: RecipeType): void {
        this.publishEvent(RecipeTypeUpdateEvent.topic, {
            existed,
            updated,
        });
    }

    public removeEvent(recipeType: RecipeType): void {
        this.publishEvent(RecipeTypeRemoveEvent.topic, recipeType);
    }
}
