import { IsBoolean, IsOptional } from 'class-validator';

export class ProductSumAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    price?: true;
}
