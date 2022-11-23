import {
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import { IRawEntity } from '@jerky/interfaces';

export namespace RawUpdate {
    export const topic = 'product.raw-update.command';

    export class Request {
        @IsUUID()
        uuid: string;

        @MaxLength(128)
        @MinLength(4)
        @IsString()
        title?: string;

        @IsString()
        @IsOptional()
        comment?: string;

        @IsString()
        @IsOptional()
        description?: string;
    }

    export type Response = IRawEntity;
}
