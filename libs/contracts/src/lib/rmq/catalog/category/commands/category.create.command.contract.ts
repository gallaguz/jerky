import { Category } from '@prisma/client/scripts/catalog-client';
import { PickType } from '@nestjs/mapped-types';
import { CategoryDto } from '../category.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';

export namespace CategoryCreateCommandContract {
    export const topic = 'catalog.category-create.command';

    export class Request extends PickType(CategoryDto, [
        'description',
    ] as const) {
        @MaxLength(128, { message: ERROR_MESSAGES.TITLE.MUST_BE_SHORTER })
        @MinLength(4, { message: ERROR_MESSAGES.TITLE.MUST_BE_LONGER })
        @IsString({ message: ERROR_MESSAGES.TITLE.MUST_BE_A_STRING })
        title: string;
    }

    export type Response = Category;
}
