import { PAYLOAD, PRICE } from '@jerky/constants';
import { IsNumber, IsPositive, Max, Min } from 'class-validator';

import { BaseCreateInputDto } from '../../../../../common';

export class RawCreateInputDto extends BaseCreateInputDto {
    @Max(PRICE.MAX)
    @Min(PRICE.MIN)
    @IsPositive()
    @IsNumber()
    price: number;

    @Max(PAYLOAD.MAX)
    @Min(PAYLOAD.MIN)
    @IsPositive()
    @IsNumber()
    payload: number;
}
