import { Recipe } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RecipeDto } from '../recipe.dto';

export namespace RecipeFindOneTitle {
    export const topic = 'catalog.recipe-find-one-title.query';

    export class Request extends PickType(RecipeDto, ['title'] as const) {}

    export type Response = Recipe;
}
