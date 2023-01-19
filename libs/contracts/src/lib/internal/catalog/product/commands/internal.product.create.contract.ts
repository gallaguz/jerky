import { TProductWithPayload } from '@jerky/interfaces';

import { ProductCreateArgsDto } from '../dto';

export namespace InternalProductCreateCommandContract {
    export const topic = 'catalog.product-create.command';
    export class Request extends ProductCreateArgsDto {}
    export type Response = TProductWithPayload;
}
