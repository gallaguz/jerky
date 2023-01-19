import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';

import { ProductFindManyArgsDto } from '../../product';
import { IngredientCoefficientCreateManyRecipeInputDto } from './ingredient-coefficient-create-many-recipe-input-dto';

export class IngredientCoefficientCreateManyRecipeInputEnvelopeDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductFindManyArgsDto)
    data: IngredientCoefficientCreateManyRecipeInputDto[];

    @IsOptional()
    @IsBoolean()
    skipDuplicates?: boolean;
}
