import { Product } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { ProductDto } from '../product.dto';

export namespace ProductCreate {
    export const topic = 'catalog.product-create.command';

    export class Request extends PickType(ProductDto, [
        'title',
        'price',
        'description',
        'recipeTypeUuid',
        'categoryUuid',
        'rawUuid',
        'recipeUuid',
    ] as const) {}

    export type Response = Product;
}
