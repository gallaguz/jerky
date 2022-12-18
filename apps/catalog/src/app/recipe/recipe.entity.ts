import { BaseEntity } from '../common';
import { IRecipeCreate, IRecipeEntity, IRecipeUpdate } from '@jerky/interfaces';
import {
    RawRemoveEvent,
    RecipeCreateEvent,
    RecipeUpdateEvent,
} from '@jerky/contracts';
import { Recipe } from '@prisma/client/scripts/catalog-client';

export class RecipeEntity extends BaseEntity implements IRecipeEntity {
    private _categoryUuid: string;
    private _rawUuid: string;
    private _recipeTypeUuid: string;

    constructor(props: IRecipeCreate) {
        super(props.uuid, props.title, props.description);

        this.setCategoryUuid(props.categoryUuid);
        this.setRecipeTypeUuid(props.recipeTypeUuid);
        this.setRawUuid(props.rawUuid);

        return this;
    }
    get categoryUuid(): string {
        return this._categoryUuid;
    }
    get rawUuid(): string {
        return this._rawUuid;
    }
    get recipeTypeUuid(): string {
        return this._recipeTypeUuid;
    }
    public setCategoryUuid(uuid: string): void {
        this._categoryUuid = uuid;
    }
    public setRawUuid(uuid: string): void {
        this._rawUuid = uuid;
    }
    public setRecipeTypeUuid(uuid: string): void {
        this._recipeTypeUuid = uuid;
    }
    public update(props: IRecipeUpdate): void {
        if (props.title) this.setTitle(props.title);
        if (props.description) this.setDescription(props.description);
        if (props.categoryUuid) this.setCategoryUuid(props.categoryUuid);
        if (props.recipeTypeUuid) this.setRecipeTypeUuid(props.recipeTypeUuid);
        if (props.rawUuid) this.setRawUuid(props.rawUuid);
    }
    public createEvent(created: Recipe): void {
        this.publishEvent(RecipeCreateEvent.topic, created);
    }
    public updateEvent(existed: Recipe, updated: Recipe): void {
        this.publishEvent(RecipeUpdateEvent.topic, { existed, updated });
    }
    public removeEvent(removed: Recipe): void {
        this.publishEvent(RawRemoveEvent.topic, removed);
    }
}
