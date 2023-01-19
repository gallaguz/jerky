import { PAYLOAD, PRICE } from '@jerky/constants';
import { Type } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    IsPositive,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';

import { BaseUpdateInputDto } from '../../../../../common';
import { ProductUpdateManyWithoutRawNestedInputDto } from '../../../product';
import { RecipeUpdateManyWithoutRawNestedInputDto } from '../../../recipe/dto/update/recipe-update-many-without-raw-nested-input-dto';

export class RawUpdateInputDto extends BaseUpdateInputDto {
    @IsOptional()
    @Max(PRICE.MAX)
    @Min(PRICE.MIN)
    @IsPositive()
    @IsNumber()
    price?: number;

    @IsOptional()
    @Max(PAYLOAD.MAX)
    @Min(PAYLOAD.MIN)
    @IsPositive()
    @IsNumber()
    payload?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductUpdateManyWithoutRawNestedInputDto)
    product?: ProductUpdateManyWithoutRawNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeUpdateManyWithoutRawNestedInputDto)
    recipe?: RecipeUpdateManyWithoutRawNestedInputDto;
}
