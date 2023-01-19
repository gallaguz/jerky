import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RawWhereUniqueInputDto } from '../other';

export class RawUpdateManyWithoutRecipeNestedInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawWhereUniqueInputDto)
    disconnect?: RawWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawWhereUniqueInputDto)
    connect?: RawWhereUniqueInputDto[];
}
