import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ICategoryEntity, IProductEntity } from '@jerky/interfaces';

export namespace ProductCreate {
    export const topic = 'catalog.product-create.command';

    export class Request {
        @MaxLength(128)
        @MinLength(4)
        @IsString()
        title: string;

        @IsString()
        @IsOptional()
        description?: string;
    }

    export type Response = IProductEntity;
}
