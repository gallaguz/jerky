import { Ingredient } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { IngredientDto } from '../ingredient.dto';

export namespace IngredientFindOneUuid {
    export const topic = 'catalog.ingredient-find-one-uuid.query';

    export class Request extends PickType(IngredientDto, ['uuid'] as const) {}

    export type Response = Ingredient;
}
