import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
} from 'class-validator';
import { User } from '@prisma/client';
import { OrderBy } from '@jerky/interfaces';

export namespace UserFindFiltered {
    export const topic = 'user.find-filtered.query';

    export class Request {
        @IsOptional()
        @IsPositive()
        @IsNumber()
        take?: number;

        @IsOptional()
        @IsPositive()
        @IsNumber()
        skip?: number;

        @IsOptional()
        @IsEnum(OrderBy)
        orderBy?: OrderBy;

        @IsOptional()
        @IsString()
        searchString?: string;
    }

    export type Response = User[];
}
