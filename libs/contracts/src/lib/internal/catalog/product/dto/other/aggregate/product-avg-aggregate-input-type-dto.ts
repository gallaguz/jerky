import { IsBoolean, IsOptional } from 'class-validator';

export class ProductAvgAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    price?: true;
}
