import { FindManyArgs } from '../../../../common';
import { Ingredient } from '@prisma/client/scripts/catalog-client';

export namespace IngredientFindFiltered {
    export const topic = 'catalog.ingredient-find-filtered.query';

    export class Request extends FindManyArgs {}

    export type Response = Ingredient[];
}
