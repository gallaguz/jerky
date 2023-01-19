import { Type } from 'class-transformer';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';

import {
    BaseCatalogWhereInputDto,
    IntNullableFilterDto,
    StringFilterDto,
} from '../../../../../../common';
import { CategoryListRelationFilterDto } from '../../../../category';
import { RawListRelationFilterDto } from '../../../../raw';
import { RawTypeListRelationFilterDto } from '../../../../raw-type';
import { RecipeRelationFilterDto } from '../../../../recipe';
import { RecipeTypeListRelationFilterDto } from '../../../../recipe-type';

export class ProductWhereInputDto extends BaseCatalogWhereInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductWhereInputDto)
    AND?: ProductWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductWhereInputDto)
    OR?: ProductWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductWhereInputDto)
    NOT?: ProductWhereInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => IntNullableFilterDto)
    price?: IntNullableFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeRelationFilterDto)
    recipe?: RecipeRelationFilterDto;

    @IsOptional()
    @IsUUID()
    @Type(() => StringFilterDto)
    recipeUuid?: StringFilterDto;

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
