import { Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';

import { BaseUpdateInputDto } from '../../../../../common';
import { CategoryUpdateManyWithoutProductNestedInputDto } from '../../../category';
import { RawUpdateManyWithoutProductNestedInputDto } from '../../../raw';
import { RawTypeUpdateManyWithoutProductNestedInputDto } from '../../../raw-type';
import { RecipeUpdateOneWithoutProductNestedInputDto } from '../../../recipe';
import { RecipeTypeUpdateManyWithoutProductNestedInputDto } from '../../../recipe-type';

export class ProductUpdateInputDto extends BaseUpdateInputDto {
    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeUpdateOneWithoutProductNestedInputDto)
    recipe?: RecipeUpdateOneWithoutProductNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryUpdateManyWithoutProductNestedInputDto)
    category?: CategoryUpdateManyWithoutProductNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawUpdateManyWithoutProductNestedInputDto)
    raw?: RawUpdateManyWithoutProductNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeUpdateManyWithoutProductNestedInputDto)
    rawType?: RawTypeUpdateManyWithoutProductNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeUpdateManyWithoutProductNestedInputDto)
    recipeType?: RecipeTypeUpdateManyWithoutProductNestedInputDto;
}
