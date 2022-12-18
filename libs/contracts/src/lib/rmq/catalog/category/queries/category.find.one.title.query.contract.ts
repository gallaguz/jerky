import { Category } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { CategoryDto } from '../category.dto';

export namespace CategoryFindOneTitleQueryContract {
    export const topic = 'catalog.category-find-one-title.query';

    export class Request extends PickType(CategoryDto, ['title'] as const) {
        title: string;
    }

    export type Response = Category;
}
