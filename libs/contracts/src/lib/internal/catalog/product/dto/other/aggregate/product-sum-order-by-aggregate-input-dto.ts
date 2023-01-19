import { IsBoolean, IsOptional } from 'class-validator';

export class ProductSumOrderByAggregateInputDto {
    @IsOptional()
    @IsBoolean()
    price?: true;
}
