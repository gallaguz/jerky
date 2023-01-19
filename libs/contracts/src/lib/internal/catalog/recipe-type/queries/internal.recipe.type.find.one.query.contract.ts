import { TRecipeTypeWithPayload } from '@jerky/interfaces';

import { RecipeTypeFindUniqueOrThrowDto } from '../dto';

export namespace InternalRecipeTypeFindOneQueryContract {
    export const topic = 'catalog.recipe-type-find-one.query';
    export class Request extends RecipeTypeFindUniqueOrThrowDto {}
    export type Response = TRecipeTypeWithPayload;
}
