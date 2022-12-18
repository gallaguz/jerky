import { Category } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { CategoryDto } from '../category.dto';

export namespace CategoryFindOneUuidQueryContract {
    export const topic = 'catalog.category-find-one-uuid.query';

    export class Request extends PickType(CategoryDto, ['uuid'] as const) {
        uuid: string;
    }

    export type Response = Category;
}
