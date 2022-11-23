import { BaseEntity } from '../common/base.entity';
import { IRecipeTypeEntity, IRecipeTypeProps } from '@jerky/interfaces';
import {
    RecipeTypeCreateEvent,
    RecipeTypeRemoveEvent,
    RecipeTypeUpdateEvent,
} from '@jerky/contracts';

export class RecipeTypeEntity extends BaseEntity implements IRecipeTypeEntity {
    constructor(uuid?: string, props?: IRecipeTypeProps) {
        super(uuid, props?.title, props?.description);

        return this;
    }

    public update(props: IRecipeTypeProps): void {
        if (props?.title) this.setTitle(props.title);
        if (props?.description) this.setDescription(props.description);
    }

    public createEvent(props: IRecipeTypeProps): void {
        this.publishEvent(RecipeTypeCreateEvent.topic, props);
    }

    public updateEvent(props: IRecipeTypeProps): void {
        this.publishEvent(RecipeTypeUpdateEvent.topic, props);
    }

    public removeEvent(): void {
        this.publishEvent(RecipeTypeRemoveEvent.topic);
    }

    public toJSON(): IRecipeTypeEntity {
        return {
            uuid: this.uuid,
            title: this.title,
            description: this.description,
        };
    }
}
