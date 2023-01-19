import { TRecipeWithPayload } from '@jerky/interfaces';

import { RecipeDeleteArgsDto } from '../dto';

export namespace InternalRecipeRemoveCommandContract {
    export const topic = 'catalog.recipe-remove.command';
    export class Request extends RecipeDeleteArgsDto {}
    export type Response = TRecipeWithPayload;
}
