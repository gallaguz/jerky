import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseCatalogOrderByDto } from '../../../../../../common';
import { ProductOrderByRelationAggregateInputDto } from '../../../../product';
import { RecipeOrderByRelationAggregateInputDto } from '../../../../recipe';

export class RecipeTypeOrderByWithRelationInputDto extends BaseCatalogOrderByDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductOrderByRelationAggregateInputDto)
    product?: ProductOrderByRelationAggregateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeOrderByRelationAggregateInputDto)
    recipe?: RecipeOrderByRelationAggregateInputDto;
}
