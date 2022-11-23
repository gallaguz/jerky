import {
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ICategoryEntity, IProductEntity } from '@jerky/interfaces';

export namespace ProductUpdate {
    export const topic = 'catalog.product-update.command';

    export class Request {
        @IsUUID()
        uuid: string;

        @MaxLength(128)
        @MinLength(4)
        @IsString()
        title?: string;

        @IsString()
        @IsOptional()
        description?: string;
    }

    export type Response = IProductEntity;
}
