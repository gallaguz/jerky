import { FindManyArgs } from '../../../../common';
import { RecipeType } from '@prisma/client/scripts/catalog-client';

export namespace RecipeTypeFindFiltered {
    export const topic = 'catalog.recipe-type-find-filtered.query';

    export class Request extends FindManyArgs {}

    export type Response = RecipeType[];
}
