import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RawTypeWhereUniqueInputDto } from '../other';

export class RawTypeCreateNestedManyWithoutProductInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeWhereUniqueInputDto)
    connect?: RawTypeWhereUniqueInputDto[];
}
