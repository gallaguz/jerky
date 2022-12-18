import { Recipe } from '@prisma/client/scripts/catalog-client';
import { RecipeDto } from '../recipe.dto';

export namespace RecipeUpdate {
    export const topic = 'catalog.recipe-update.command';

    export class Request extends RecipeDto {
        uuid: string;
    }

    export type Response = Recipe;
}
