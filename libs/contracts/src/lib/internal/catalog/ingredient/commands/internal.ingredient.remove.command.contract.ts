import { TIngredientWithPayload } from '@jerky/interfaces';

import { IngredientDeleteArgsDto } from '../dto';

export namespace InternalIngredientRemoveCommandContract {
    export const topic = 'catalog.ingredient-remove.command';
    export class Request extends IngredientDeleteArgsDto {}
    export type Response = TIngredientWithPayload;
}
