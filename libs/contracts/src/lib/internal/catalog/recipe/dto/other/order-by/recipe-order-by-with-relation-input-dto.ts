import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseCatalogOrderByDto } from '../../../../../../common';
import { CategoryOrderByRelationAggregateInputDto } from '../../../../category';
import { IngredientCoefficientOrderByRelationAggregateInputDto } from '../../../../ingredient-coefficient';
import { ProductOrderByRelationAggregateInputDto } from '../../../../product';
import { RawOrderByRelationAggregateInputDto } from '../../../../raw';
import { RawTypeOrderByRelationAggregateInputDto } from '../../../../raw-type';
import { RecipeTypeOrderByRelationAggregateInputDto } from '../../../../recipe-type';

export class RecipeOrderByWithRelationInputDto extends BaseCatalogOrderByDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientOrderByRelationAggregateInputDto)
    ingredientCoefficient?: IngredientCoefficientOrderByRelationAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductOrderByRelationAggregateInputDto)
    product?: ProductOrderByRelationAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryOrderByRelationAggregateInputDto)
    category?: CategoryOrderByRelationAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawOrderByRelationAggregateInputDto)
    raw?: RawOrderByRelationAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeOrderByRelationAggregateInputDto)
    rawType?: RawTypeOrderByRelationAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeOrderByRelationAggregateInputDto)
    recipeType?: RecipeTypeOrderByRelationAggregateInputDto;
}
