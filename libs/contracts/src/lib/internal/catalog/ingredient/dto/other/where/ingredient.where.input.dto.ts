import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import {
    BaseCatalogWhereInputDto,
    FloatFilterDto,
    StringFilterDto,
} from '../../../../../../common';
import { IngredientCoefficientListRelationFilterDto } from '../../../../ingredient-coefficient';

export class IngredientWhereInputDto extends BaseCatalogWhereInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientWhereInputDto)
    AND?: IngredientWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientWhereInputDto)
    OR?: IngredientWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientWhereInputDto)
    NOT?: IngredientWhereInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => StringFilterDto)
    type?: StringFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => FloatFilterDto)
    price?: FloatFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => FloatFilterDto)
    payload?: FloatFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientListRelationFilterDto)
    ingredientCoefficient?: IngredientCoefficientListRelationFilterDto;
}
