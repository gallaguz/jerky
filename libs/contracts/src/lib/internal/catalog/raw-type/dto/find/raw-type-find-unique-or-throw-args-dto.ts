import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import {
    RawTypeIncludeDto,
    RawTypeSelectDto,
    RawTypeWhereUniqueInputDto,
} from '../other';

export class RawTypeFindUniqueOrThrowArgsDto {
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
    @Type(() => RawTypeWhereUniqueInputDto)
    where: RawTypeWhereUniqueInputDto;
}
