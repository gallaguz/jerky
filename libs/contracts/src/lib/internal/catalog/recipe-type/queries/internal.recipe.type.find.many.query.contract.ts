import { TRecipeTypeWithPayload } from '@jerky/interfaces';

import { RecipeTypeFindManyArgsDto } from '../dto';

export namespace InternalRecipeTypeFindManyQueryContract {
    export const topic = 'catalog.recipe-type-find-many.query';
    export class Request extends RecipeTypeFindManyArgsDto {}
    export type Response = TRecipeTypeWithPayload[];
}
