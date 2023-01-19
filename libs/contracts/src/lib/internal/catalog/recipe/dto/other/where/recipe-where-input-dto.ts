import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseCatalogWhereInputDto } from '../../../../../../common';
import { CategoryListRelationFilterDto } from '../../../../category';
import { IngredientCoefficientListRelationFilterDto } from '../../../../ingredient-coefficient';
import { ProductListRelationFilterDto } from '../../../../product';
import { RawListRelationFilterDto } from '../../../../raw';
import { RawTypeListRelationFilterDto } from '../../../../raw-type';
import { RecipeTypeListRelationFilterDto } from '../../../../recipe-type';

export class RecipeWhereInputDto extends BaseCatalogWhereInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeWhereInputDto)
    AND?: RecipeWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeWhereInputDto)
    OR?: RecipeWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeWhereInputDto)
    NOT?: RecipeWhereInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientListRelationFilterDto)
    ingredientCoefficient?: IngredientCoefficientListRelationFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductListRelationFilterDto)
    product?: ProductListRelationFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryListRelationFilterDto)
    category?: CategoryListRelationFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawListRelationFilterDto)
    raw?: RawListRelationFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeListRelationFilterDto)
    rawType?: RawTypeListRelationFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeListRelationFilterDto)
    recipeType?: RecipeTypeListRelationFilterDto;
}
