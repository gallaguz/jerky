import { TRecipeWithPayload } from '@jerky/interfaces';

import { RecipeUpdateArgsDto } from '../dto';

export namespace InternalRecipeUpdateCommandContract {
    export const topic = 'catalog.recipe-update.command';
    export class Request extends RecipeUpdateArgsDto {}
    export type Response = TRecipeWithPayload;
}
