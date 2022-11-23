import { ICategoryEntity } from '@jerky/interfaces';
import { FindFiltered } from '../../../../common';

export namespace IngredientFindFiltered {
    export const topic = 'catalog.ingredient-find-filtered.query';

    export class Request extends FindFiltered {}

    export type Response = ICategoryEntity[];
}
