import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';
import { OrderBy } from '@jerky/enums';
import TAKE = ERROR_MESSAGES.TAKE;
import ORDER_BY = ERROR_MESSAGES.ORDER_BY;
import SEARCH_STRING = ERROR_MESSAGES.SEARCH_STRING;
import SKIP = ERROR_MESSAGES.SKIP;

export class FindFiltered {
    @IsOptional()
    @Min(1, { message: TAKE.MUST_NOT_BE_NO_LESS_THEN_1 })
    @IsNumber({}, { message: TAKE.MUST_BE_A_NUMBER })
    take?: number;

    @IsOptional()
    @Min(0, { message: SKIP.MUST_NOT_BE_LESS_THEN_ZERO })
    @IsNumber({}, { message: SKIP.MUST_BE_A_NUMBER })
    skip?: number;

    @IsOptional()
    @IsEnum(OrderBy, {
        message: ORDER_BY.MUST_BE_ASC_OD_DESC,
    })
    orderBy?: OrderBy;

    @IsOptional()
    @IsString({
        message: SEARCH_STRING.MUST_BE_A_STRING,
    })
    searchString?: string;
}
