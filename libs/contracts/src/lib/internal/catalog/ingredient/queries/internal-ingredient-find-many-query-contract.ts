import { TIngredientWithPayload } from '@jerky/interfaces';

import { IngredientFindManyArgsDto } from '../dto';

export namespace InternalIngredientFindManyQueryContract {
    export const topic = 'catalog.ingredient-find-many.query';
    export class Request extends IngredientFindManyArgsDto {}
    export type Response = TIngredientWithPayload[];
}
