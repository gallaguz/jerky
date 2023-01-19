import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { IngredientArgsDto } from '../../../ingredient';
import { RecipeArgsDto } from '../../../recipe';
import { IngredientCoefficientWhereInputDto } from '../where';

export class IngredientCoefficientIncludeDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereInputDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    recipe?: boolean | RecipeArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereInputDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    ingredient?: boolean | IngredientArgsDto;
}
