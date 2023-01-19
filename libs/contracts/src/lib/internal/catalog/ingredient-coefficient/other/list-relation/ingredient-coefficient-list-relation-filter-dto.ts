import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { IngredientCoefficientWhereInputDto } from '../where';

export class IngredientCoefficientListRelationFilterDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereInputDto)
    every?: IngredientCoefficientWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereInputDto)
    some?: IngredientCoefficientWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereInputDto)
    none?: IngredientCoefficientWhereInputDto;
}
