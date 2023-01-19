import { TProductWithPayload } from '@jerky/interfaces';

import { ProductDeleteArgsDto } from '../dto';

export namespace InternalProductRemoveCommandContract {
    export const topic = 'catalog.product-remove.command';
    export class Request extends ProductDeleteArgsDto {}
    export type Response = TProductWithPayload;
}
