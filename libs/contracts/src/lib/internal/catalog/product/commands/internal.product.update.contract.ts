import { TProductWithPayload } from '@jerky/interfaces';

import { ProductUpdateArgsDto } from '../dto';

export namespace InternalProductUpdateCommandContract {
    export const topic = 'catalog.product-update.command';
    export class Request extends ProductUpdateArgsDto {}

    export type Response = TProductWithPayload;
}
