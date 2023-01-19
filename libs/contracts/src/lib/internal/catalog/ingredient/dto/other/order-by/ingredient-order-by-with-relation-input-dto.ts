import { Prisma } from '@prisma/client/scripts/catalog-client';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import SortOrder = Prisma.SortOrder;
import { BaseCatalogOrderByDto } from '../../../../../../common';
import { IngredientCoefficientOrderByRelationAggregateInputDto } from '../../../../ingredient-coefficient';

export class IngredientOrderByWithRelationInputDto extends BaseCatalogOrderByDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return false;
    })
    type?: SortOrder;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return false;
    })
    price?: SortOrder;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        if (value === 'asc') return SortOrder.asc;
        if (value === 'desc') return SortOrder.desc;
        return false;
    })
    payload?: SortOrder;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientOrderByRelationAggregateInputDto)
    ingredientCoefficient?: IngredientCoefficientOrderByRelationAggregateInputDto;
}
