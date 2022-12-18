import { FindManyArgs } from '../../../../common';
import { Product } from '@prisma/client/scripts/catalog-client';

export namespace ProductFindFiltered {
    export const topic = 'catalog.product-find-filtered.query';

    export class Request extends FindManyArgs {}

    export type Response = Product[];
}
