import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { IUser, OrderBy } from '@jerky/interfaces';
import { ORDER_BY, SEARCH_STRING, SKIP, TAKE } from '@jerky/constants';

export namespace UserFindFiltered {
    export const topic = 'user.find-filtered.query';

    export class Request {
        @IsOptional()
        @Min(1, { message: TAKE.MUST_NOT_BE_NO_LESS_THEN_1 })
        @IsNumber({}, { message: TAKE.MUST_BE_A_NUMBER })
        take?: number;

        @IsOptional()
        @Min(0, { message: SKIP.MUST_NOT_BE_LESS_THEN_ZERO })
        @IsNumber({}, { message: SKIP.MUST_BE_A_NUMBER })
        skip?: number;

        @IsOptional()
        @IsEnum(OrderBy, { message: ORDER_BY.MUST_BE_ASC_OD_DESC })
        orderBy?: OrderBy;

        @IsOptional()
        @IsString({ message: SEARCH_STRING.MUST_BE_A_STRING })
        searchString?: string;
    }

    export type Response = IUser[];
}
