import { Category } from '@prisma/client/scripts/catalog-client';
import { CategoryDto } from '../category.dto';
import { PickType } from '@nestjs/mapped-types';

export namespace CategoryRemoveCommandContract {
    export const topic = 'catalog.category-remove.command';

    export class Request extends PickType(CategoryDto, ['uuid'] as const) {
        uuid: string;
    }

    export type Response = Category;
}
