import {
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { IRawEntity } from '@jerky/interfaces';

export namespace RawCreate {
    export const topic = 'catalog.raw-create.command';

    export class Request {
        @MaxLength(128)
        @MinLength(4)
        @IsString()
        title: string;

        @IsPositive()
        @IsNumber()
        @IsNumber()
        price: number;

        @IsString()
        @IsOptional()
        comment?: string;

        @IsString()
        @IsOptional()
        description?: string;
    }

    export type Response = IRawEntity;
}
