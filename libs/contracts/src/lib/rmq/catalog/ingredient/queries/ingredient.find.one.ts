import { ICategoryEntity } from '@jerky/interfaces';
import { FindOne } from '../../../../common';

export namespace IngredientFindOne {
    export const topic = 'catalog.ingredient-find-one.query';

    export class Request extends FindOne {}

    export type Response = ICategoryEntity;
}
