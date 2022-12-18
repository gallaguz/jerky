import { Recipe } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RecipeDto } from '../recipe.dto';

export namespace RecipeCreate {
    export const topic = 'catalog.recipe-create.command';

    export class Request extends PickType(RecipeDto, [
        'title',
        'description',
        'recipeTypeUuid',
        'categoryUuid',
        'rawUuid',
    ] as const) {
        title: string;
    }

    export type Response = Recipe;
}
