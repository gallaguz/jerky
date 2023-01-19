import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { ProductWhereInputDto } from '../where';

export class ProductListRelationFilterDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductWhereInputDto)
    every?: ProductWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductWhereInputDto)
    some?: ProductWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductWhereInputDto)
    none?: ProductWhereInputDto;
}
