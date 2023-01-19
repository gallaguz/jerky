import { TIngredientWithPayload } from '@jerky/interfaces';

import { IngredientCreateArgsDto } from '../dto';

export namespace InternalIngredientCreateCommandContract {
    export const topic = 'catalog.ingredient-create.command';
    export class Request extends IngredientCreateArgsDto {}
    export type Response = TIngredientWithPayload;
}
