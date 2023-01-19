import { TIngredientWithPayload } from '@jerky/interfaces';

import { IngredientUpdateArgsDto } from '../dto';

export namespace InternalIngredientUpdateCommandContract {
    export const topic = 'catalog.ingredient-update.command';
    export class Request extends IngredientUpdateArgsDto {}
    export type Response = TIngredientWithPayload;
}
