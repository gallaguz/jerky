import { TRecipeTypeWithPayload } from '@jerky/interfaces';

import { RecipeTypeDeleteArgsDto } from '../dto';

export namespace InternalRecipeTypeRemoveCommandContract {
    export const topic = 'catalog.recipe-type-remove.command';
    export class Request extends RecipeTypeDeleteArgsDto {}
    export type Response = TRecipeTypeWithPayload;
}
