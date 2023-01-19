import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseUpdateInputDto } from '../../../../../common';
import { ProductUpdateManyWithoutRawTypeNestedInputDto } from '../../../product';
import { RecipeUpdateManyWithoutRawTypeNestedInputDto } from '../../../recipe';

export class RawTypeUpdateInputDto extends BaseUpdateInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductUpdateManyWithoutRawTypeNestedInputDto)
    product?: ProductUpdateManyWithoutRawTypeNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeUpdateManyWithoutRawTypeNestedInputDto)
    recipe?: RecipeUpdateManyWithoutRawTypeNestedInputDto;
}
