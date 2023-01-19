import { PAYLOAD, PRICE } from '@jerky/constants';
import { IsNumber, IsPositive, IsString, Max, Min } from 'class-validator';

import { BaseCreateInputDto } from '../../../../../common';

export class IngredientCreateInputDto extends BaseCreateInputDto {
    @IsString()
    type: string;

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
