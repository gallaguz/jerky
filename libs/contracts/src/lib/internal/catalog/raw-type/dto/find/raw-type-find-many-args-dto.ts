import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { TakeSkip } from '../../../../../common';
import {
    RawTypeIncludeDto,
    RawTypeOrderByWithRelationInputDto,
    RawTypeSelectDto,
    RawTypeWhereInputDto,
    RawTypeWhereUniqueInputDto,
} from '../other';

export class RawTypeFindManyArgsDto extends TakeSkip {
    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: RawTypeSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: RawTypeIncludeDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeWhereInputDto)
    where?: RawTypeWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawTypeOrderByWithRelationInputDto)
    orderBy?: RawTypeOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeWhereUniqueInputDto)
    cursor?: RawTypeWhereUniqueInputDto;
}
