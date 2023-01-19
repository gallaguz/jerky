import { TIngredientWithPayload } from '@jerky/interfaces';

import { IngredientFindUniqueOrThrowDto } from '../dto';

export namespace InternalIngredientFindOneQueryContract {
    export const topic = 'catalog.ingredient-find-one.query';
    export class Request extends IngredientFindUniqueOrThrowDto {}
    export type Response = TIngredientWithPayload;
}
