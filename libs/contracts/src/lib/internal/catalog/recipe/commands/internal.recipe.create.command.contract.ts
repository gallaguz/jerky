import { TRecipeWithPayload } from '@jerky/interfaces';

import { RecipeCreateArgsDto } from '../dto';

export namespace InternalRecipeCreateCommandContract {
    export const topic = 'catalog.recipe-create.command';
    export class Request extends RecipeCreateArgsDto {}
    export type Response = TRecipeWithPayload;
}
