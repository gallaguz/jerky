import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RecipeWhereInputDto } from '../where';

export class RecipeListRelationFilterDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeWhereInputDto)
    every?: RecipeWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeWhereInputDto)
    some?: RecipeWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeWhereInputDto)
    none?: RecipeWhereInputDto;
}
