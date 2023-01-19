import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RawWhereUniqueInputDto } from '../other';

export class RawCreateNestedManyWithoutProductInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RawWhereUniqueInputDto)
    connect?: RawWhereUniqueInputDto[];
}
