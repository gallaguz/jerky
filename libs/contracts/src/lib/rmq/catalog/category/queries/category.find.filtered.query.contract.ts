import { FindManyArgs } from '../../../../common';
import { Category } from '@prisma/client/scripts/catalog-client';

export namespace CategoryFindFilteredQueryContract {
    export const topic = 'catalog.category-find-filtered.query';

    export class Request extends FindManyArgs {}

    export type Response = Category[];
}
