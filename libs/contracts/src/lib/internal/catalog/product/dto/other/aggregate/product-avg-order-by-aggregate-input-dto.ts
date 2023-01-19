import { IsBoolean, IsOptional } from 'class-validator';

export class ProductAvgOrderByAggregateInputDto {
    @IsOptional()
    @IsBoolean()
    price?: true;
}
