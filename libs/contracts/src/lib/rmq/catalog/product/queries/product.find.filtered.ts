import { FindFiltered } from '../../../../common';
import { IProductEntity } from '@jerky/interfaces';

export namespace ProductFindFiltered {
    export const topic = 'catalog.product-find-filtered.query';

    export class Request extends FindFiltered {}

    export type Response = IProductEntity[];
}
