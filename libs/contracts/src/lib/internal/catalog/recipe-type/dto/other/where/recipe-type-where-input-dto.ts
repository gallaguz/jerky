import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseCatalogWhereInputDto } from '../../../../../../common';
import { ProductListRelationFilterDto } from '../../../../product';
import { RecipeListRelationFilterDto } from '../../../../recipe';

export class RecipeTypeWhereInputDto extends BaseCatalogWhereInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeTypeWhereInputDto)
    AND?: RecipeTypeWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeTypeWhereInputDto)
    OR?: RecipeTypeWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeTypeWhereInputDto)
    NOT?: RecipeTypeWhereInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductListRelationFilterDto)
    product?: ProductListRelationFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeListRelationFilterDto)
    recipe?: RecipeListRelationFilterDto;
}
