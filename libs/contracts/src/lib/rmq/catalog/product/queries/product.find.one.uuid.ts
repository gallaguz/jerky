import { Product } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { ProductDto } from '../product.dto';

export namespace ProductFindOneUuid {
    export const topic = 'catalog.product-find-one-uuid.query';

    export class Request extends PickType(ProductDto, ['uuid'] as const) {}

    export type Response = Product;
}
