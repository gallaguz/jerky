import { FindManyArgs } from '../../../../common';
import { Recipe } from '@prisma/client/scripts/catalog-client';

export namespace RecipeFindFiltered {
    export const topic = 'catalog.recipe-find-filtered.query';

    export class Request extends FindManyArgs {}

    export type Response = Recipe[];
}
