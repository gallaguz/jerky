import { TRecipeWithPayload } from '@jerky/interfaces';

import { RecipeFindManyArgsDto } from '../dto';

export namespace InternalRecipeFindManyQueryContract {
    export const topic = 'catalog.recipe-find-many.query';
    export class Request extends RecipeFindManyArgsDto {}
    export type Response = TRecipeWithPayload[];
}
