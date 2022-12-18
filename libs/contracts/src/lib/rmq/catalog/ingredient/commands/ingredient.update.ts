import { Ingredient } from '@prisma/client/scripts/catalog-client';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { IngredientDto } from '../ingredient.dto';

export namespace IngredientUpdate {
    export const topic = 'catalog.ingredient-update.command';

    export class Request extends PartialType(IngredientDto) {
        uuid: string;
    }

    export type Response = Ingredient;
}
