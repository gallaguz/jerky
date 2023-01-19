import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { TakeSkip } from '../../../../../common';
import {
    RawIncludeDto,
    RawOrderByWithRelationInputDto,
    RawSelectDto,
    RawWhereInputDto,
    RawWhereUniqueInputDto,
} from '../other';

export class RawFindManyArgsDto extends TakeSkip {
    @IsOptional()
    @ValidateNested()
    @Type(() => RawSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: RawSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: RawIncludeDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawWhereInputDto)
    where?: RawWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawOrderByWithRelationInputDto)
    orderBy?: RawOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => RawWhereUniqueInputDto)
    cursor?: RawWhereUniqueInputDto;
}
