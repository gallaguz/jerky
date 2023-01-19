import { TProductWithPayload } from '@jerky/interfaces';

import { ProductFindUniqueOrThrowArgsDto } from '../dto';

export namespace InternalProductFindOneQueryContract {
    export const topic = 'catalog.product-find-one.query';
    export class Request extends ProductFindUniqueOrThrowArgsDto {}
    export type Response = TProductWithPayload;
}
