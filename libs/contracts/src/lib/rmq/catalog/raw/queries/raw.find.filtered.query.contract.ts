import { FindManyArgs } from '../../../../common';
import { Raw } from '@prisma/client/scripts/catalog-client';

export namespace RawFindFilteredQueryContract {
    export const topic = 'catalog.raw-find-filtered.query';

    export class Request extends FindManyArgs {}

    export type Response = Raw[];
}
