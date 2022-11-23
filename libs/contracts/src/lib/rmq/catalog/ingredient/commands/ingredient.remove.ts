import { IsUUID } from 'class-validator';
import { ICategoryEntity, IIngredientEntity } from '@jerky/interfaces';

export namespace IngredientRemove {
    export const topic = 'catalog.ingredient-remove.command';

    export class Request {
        @IsUUID()
        uuid: string;
    }

    export type Response = IIngredientEntity;
}
