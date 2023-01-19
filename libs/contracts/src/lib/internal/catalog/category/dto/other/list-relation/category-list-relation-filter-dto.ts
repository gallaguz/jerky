import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { CategoryWhereInputDto } from '../where';

export class CategoryListRelationFilterDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryWhereInputDto)
    every?: CategoryWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryWhereInputDto)
    some?: CategoryWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryWhereInputDto)
    none?: CategoryWhereInputDto;
}
