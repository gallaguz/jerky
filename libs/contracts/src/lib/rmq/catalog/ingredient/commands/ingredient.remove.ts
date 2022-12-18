import { PickType } from '@nestjs/mapped-types';
import { IngredientDto } from '../ingredient.dto';
import { Ingredient } from '@prisma/client/scripts/catalog-client';

export namespace IngredientRemove {
    export const topic = 'catalog.ingredient-remove.command';

    export class Request extends PickType(IngredientDto, ['uuid'] as const) {}

    export type Response = Ingredient;
}
