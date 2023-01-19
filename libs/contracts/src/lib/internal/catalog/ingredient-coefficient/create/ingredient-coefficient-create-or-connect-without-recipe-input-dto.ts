import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { IngredientCoefficientWhereUniqueInputDto } from '../other';
import { IngredientCoefficientCreateWithoutRecipeInputDto } from './ingredient-coefficient-create-without-recipe-input-dto';

export class IngredientCoefficientCreateOrConnectWithoutRecipeInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereUniqueInputDto)
    where: IngredientCoefficientWhereUniqueInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientCreateWithoutRecipeInputDto)
    create: IngredientCoefficientCreateWithoutRecipeInputDto;
}
