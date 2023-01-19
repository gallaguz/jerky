import { TRecipeTypeWithPayload } from '@jerky/interfaces';

import { RecipeTypeUpdateArgsDto } from '../dto';

export namespace InternalRecipeTypeUpdateCommandContract {
    export const topic = 'catalog.recipe-type-update.command';
    export class Request extends RecipeTypeUpdateArgsDto {}
    export type Response = TRecipeTypeWithPayload;
}
