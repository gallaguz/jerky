import { IsUUID } from 'class-validator';
import { ICategoryEntity, IRecipeEntity } from '@jerky/interfaces';

export namespace RecipeRemove {
    export const topic = 'catalog.recipe-remove.command';

    export class Request {
        @IsUUID()
        uuid: string;
    }

    export type Response = IRecipeEntity;
}
