import {
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ICategoryEntity } from '@jerky/interfaces';

export namespace CategoryUpdate {
    export const topic = 'catalog.category-update.command';

    export class Request {
        @IsUUID()
        uuid: string;

        @IsOptional()
        @MaxLength(128)
        @MinLength(4)
        @IsString()
        title?: string;

        @IsOptional()
        @IsString()
        comment?: string;
    }

    export type Response = ICategoryEntity;
}
