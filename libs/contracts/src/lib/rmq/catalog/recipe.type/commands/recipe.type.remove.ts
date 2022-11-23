import { IsUUID } from 'class-validator';
import { IRecipeTypeEntity } from '@jerky/interfaces';

export namespace RecipeTypeRemove {
    export const topic = 'catalog.recipe-type-remove.command';

    export class Request {
        @IsUUID()
        uuid: string;
    }

    export type Response = IRecipeTypeEntity;
}
