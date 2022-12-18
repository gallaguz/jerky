import { Ingredient } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { IngredientDto } from '../ingredient.dto';

export namespace IngredientFindOneTitle {
    export const topic = 'catalog.ingredient-find-one-title.query';

    export class Request extends PickType(IngredientDto, ['title'] as const) {}

    export type Response = Ingredient;
}
