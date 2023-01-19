import { TProductWithPayload } from '@jerky/interfaces';

import { ProductFindManyArgsDto } from '../dto';

export namespace InternalProductFindManyQueryContract {
    export const topic = 'catalog.product-find-many.query';
    export class Request extends ProductFindManyArgsDto {}
    export type Response = TProductWithPayload[];
}
