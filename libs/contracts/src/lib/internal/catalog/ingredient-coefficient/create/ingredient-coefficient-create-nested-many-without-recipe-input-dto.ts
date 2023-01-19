import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { IngredientCoefficientWhereUniqueInputDto } from '../other';
import { IngredientCoefficientCreateManyRecipeInputEnvelopeDto } from './ingredient-coefficient-create-many-recipe-input-envelope-dto';
import { IngredientCoefficientCreateOrConnectWithoutRecipeInputDto } from './ingredient-coefficient-create-or-connect-without-recipe-input-dto';
import { IngredientCoefficientCreateWithoutRecipeInputDto } from './ingredient-coefficient-create-without-recipe-input-dto';

export class IngredientCoefficientCreateNestedManyWithoutRecipeInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientCreateWithoutRecipeInputDto)
    create?: IngredientCoefficientCreateWithoutRecipeInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientCreateOrConnectWithoutRecipeInputDto)
    connectOrCreate?: IngredientCoefficientCreateOrConnectWithoutRecipeInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientCreateManyRecipeInputEnvelopeDto)
    createMany?: IngredientCoefficientCreateManyRecipeInputEnvelopeDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientWhereUniqueInputDto)
    connect?: IngredientCoefficientWhereUniqueInputDto[];
}
