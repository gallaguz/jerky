import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { IngredientCoefficientCreateWithoutRecipeInputDto } from '../create';
import { IngredientCoefficientWhereUniqueInputDto } from '../other';
import { IngredientCoefficientUpdateWithoutRecipeInputDto } from '../update';

export class IngredientCoefficientUpsertWithWhereUniqueWithoutRecipeInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereUniqueInputDto)
    where: IngredientCoefficientWhereUniqueInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientUpdateWithoutRecipeInputDto)
    update: IngredientCoefficientUpdateWithoutRecipeInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientCreateWithoutRecipeInputDto)
    create: IngredientCoefficientCreateWithoutRecipeInputDto;
}
