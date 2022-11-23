import { BaseEntity } from '../common/base.entity';
import { IRecipeEntity, IRecipeProps } from '@jerky/interfaces';
import {
    RawRemoveEvent,
    RecipeCreateEvent,
    RecipeUpdateEvent,
} from '@jerky/contracts';

export class RecipeEntity extends BaseEntity implements IRecipeEntity {
    private _recipeTypeUuid: string;
    private _categoryUuid: string;
    private _rawUuid: string;

    constructor(uuid?: string, props?: IRecipeProps) {
        super(uuid, props?.title, props?.description);

        if (props?.categoryUuid) this.setCategoryUuid(props.categoryUuid);
        if (props?.rawUuid) this.setRawUuid(props.rawUuid);
        if (props?.recipeTypeUuid) this.setRecipeTypeUuid(props.recipeTypeUuid);

        return this;
    }

    get recipeTypeUuid(): string {
        return this._recipeTypeUuid;
    }

    get categoryUuid(): string {
        return this._categoryUuid;
    }

    get rawUuid(): string {
        return this._rawUuid;
    }

    public setRecipeTypeUuid(recipeTypeUuid: string): void {
        this._recipeTypeUuid = recipeTypeUuid;
    }

    public setCategoryUuid(categoryUuid: string): void {
        this._categoryUuid = categoryUuid;
    }

    public setRawUuid(rawUuid: string): void {
        this._rawUuid = rawUuid;
    }

    public update(props: IRecipeProps): void {
        if (props?.title) this.setTitle(props.title);
        if (props?.description) this.setDescription(props.description);
        if (props?.categoryUuid) this.setCategoryUuid(props.categoryUuid);
        if (props?.rawUuid) this.setRawUuid(props.rawUuid);
        if (props?.recipeTypeUuid) this.setRecipeTypeUuid(props.recipeTypeUuid);
    }

    public createEvent(props: IRecipeProps): void {
        this.publishEvent(RecipeCreateEvent.topic, props);
    }

    public updateEvent(props: IRecipeProps): void {
        this.publishEvent(RecipeUpdateEvent.topic, props);
    }

    public removeEvent(): void {
        this.publishEvent(RawRemoveEvent.topic);
    }

    public override toJSON(): IRecipeEntity {
        return {
            uuid: this.uuid,
            rawUuid: this.rawUuid,
            categoryUuid: this.categoryUuid,
            recipeTypeUuid: this.recipeTypeUuid,
            title: this.title,
            description: this.description,
        };
    }
}
