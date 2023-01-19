import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RecipeTypeWhereInputDto } from '../where';

export class RecipeTypeListRelationFilterDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeWhereInputDto)
    every?: RecipeTypeWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeWhereInputDto)
    some?: RecipeTypeWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeWhereInputDto)
    none?: RecipeTypeWhereInputDto;
}
