import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ICategoryEntity } from '@jerky/interfaces';

export namespace CategoryCreate {
    export const topic = 'catalog.category-create.command';

    export class Request {
        @MaxLength(128)
        @MinLength(4)
        @IsString()
        title: string;

        @IsOptional()
        @IsString()
        comment?: string;
    }

    export type Response = ICategoryEntity;
}
