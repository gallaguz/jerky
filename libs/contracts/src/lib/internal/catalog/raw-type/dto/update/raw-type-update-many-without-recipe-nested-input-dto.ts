import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RawTypeWhereUniqueInputDto } from '../other';

export class RawTypeUpdateManyWithoutRecipeNestedInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawTypeWhereUniqueInputDto)
    disconnect?: RawTypeWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawTypeWhereUniqueInputDto)
    connect?: RawTypeWhereUniqueInputDto[];
}
