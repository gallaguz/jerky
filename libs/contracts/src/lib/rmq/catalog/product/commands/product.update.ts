import { Product } from '@prisma/client/scripts/catalog-client';
import { ProductDto } from '../product.dto';

export namespace ProductUpdate {
    export const topic = 'catalog.product-update.command';

    export class Request extends ProductDto {}

    export type Response = Product;
}
