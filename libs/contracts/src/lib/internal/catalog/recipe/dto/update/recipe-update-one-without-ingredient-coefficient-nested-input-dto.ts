import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';

import { RecipeWhereUniqueInputDto } from '../other';

export class RecipeUpdateOneWithoutIngredientCoefficientNestedInputDto {
    @IsOptional()
    @IsBoolean()
    disconnect?: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeWhereUniqueInputDto)
    connect?: RecipeWhereUniqueInputDto;
}
