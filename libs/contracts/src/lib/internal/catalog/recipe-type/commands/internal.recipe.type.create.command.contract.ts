import { TRecipeTypeWithPayload } from '@jerky/interfaces';

import { RecipeTypeCreateArgsDto } from '../dto';

export namespace InternalRecipeTypeCreateCommandContract {
    export const topic = 'catalog.recipe-type-create.command';
    export class Request extends RecipeTypeCreateArgsDto {}
    export type Response = TRecipeTypeWithPayload;
}
