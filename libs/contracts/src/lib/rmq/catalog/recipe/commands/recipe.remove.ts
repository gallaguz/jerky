import { Recipe } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { RecipeDto } from '../recipe.dto';

export namespace RecipeRemove {
    export const topic = 'catalog.recipe-remove.command';

    export class Request extends PickType(RecipeDto, ['uuid'] as const) {}

    export type Response = Recipe;
}
