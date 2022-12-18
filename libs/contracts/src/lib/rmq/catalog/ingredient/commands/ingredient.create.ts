import { Ingredient } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { IngredientDto } from '../ingredient.dto';

export namespace IngredientCreate {
    export const topic = 'catalog.ingredient-create.command';

    export class Request extends PickType(IngredientDto, [
        'title',
        'price',
        'form',
        'description',
    ] as const) {
        title: string;
        price: number;
    }

    export type Response = Ingredient;
}
