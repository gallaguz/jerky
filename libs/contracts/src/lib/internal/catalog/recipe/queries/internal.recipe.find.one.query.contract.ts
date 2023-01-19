import { TRecipeWithPayload } from '@jerky/interfaces';

import { RecipeFindUniqueOrThrowArgsDto } from '../dto';

export namespace InternalRecipeFindOneQueryContract {
    export const topic = 'catalog.recipe-find-one.query';
    export class Request extends RecipeFindUniqueOrThrowArgsDto {}
    export type Response = TRecipeWithPayload;
}
