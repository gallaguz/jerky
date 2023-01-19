import { Type } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    IsPositive,
    ValidateNested,
} from 'class-validator';

import { BaseCreateInputDto } from '../../../../../common';
import { CategoryCreateNestedManyWithoutProductInputDto } from '../../../category';
import { RawCreateNestedManyWithoutProductInputDto } from '../../../raw';
import { RawTypeCreateNestedManyWithoutProductInputDto } from '../../../raw-type';
import { RecipeCreateNestedOneWithoutProductInputDto } from '../../../recipe';
import { RecipeTypeCreateNestedManyWithoutProductInputDto } from '../../../recipe-type';

export class ProductCreateInputDto extends BaseCreateInputDto {
    @IsOptional()
    @IsPositive()
    @IsNumber()
    price?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeCreateNestedOneWithoutProductInputDto)
    recipe?: RecipeCreateNestedOneWithoutProductInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryCreateNestedManyWithoutProductInputDto)
    category?: CategoryCreateNestedManyWithoutProductInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawCreateNestedManyWithoutProductInputDto)
    raw?: RawCreateNestedManyWithoutProductInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeCreateNestedManyWithoutProductInputDto)
    rawType?: RawTypeCreateNestedManyWithoutProductInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeCreateNestedManyWithoutProductInputDto)
    recipeType?: RecipeTypeCreateNestedManyWithoutProductInputDto;
}
