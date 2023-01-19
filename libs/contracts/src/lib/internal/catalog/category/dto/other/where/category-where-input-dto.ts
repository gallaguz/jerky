import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseCatalogWhereInputDto } from '../../../../../../common';
import { ProductListRelationFilterDto } from '../../../../product';
import { RecipeListRelationFilterDto } from '../../../../recipe';

export class CategoryWhereInputDto extends BaseCatalogWhereInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryWhereInputDto)
    AND?: CategoryWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryWhereInputDto)
    OR?: CategoryWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryWhereInputDto)
    NOT?: CategoryWhereInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductListRelationFilterDto)
    product?: ProductListRelationFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeListRelationFilterDto)
    recipe?: RecipeListRelationFilterDto;
}
