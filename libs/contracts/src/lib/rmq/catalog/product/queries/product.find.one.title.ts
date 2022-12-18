import { Product } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { ProductDto } from '../product.dto';

export namespace ProductFindOneTitle {
    export const topic = 'catalog.product-find-one-title.query';

    export class Request extends PickType(ProductDto, ['title'] as const) {}

    export type Response = Product;
}
