import 'reflect-metadata';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';
import { BaseCatalogDto } from '../../../common';

export class RawDto extends BaseCatalogDto {
    @IsOptional()
    @IsPositive({ message: ERROR_MESSAGES.PRICE.MUST_BE_A_POSITIVE })
    @IsNumber({}, { message: ERROR_MESSAGES.PRICE.MUST_BE_A_NUMBER })
    price?: number;
}
