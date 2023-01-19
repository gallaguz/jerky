import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RawIncludeDto, RawSelectDto, RawWhereUniqueInputDto } from '../other';
import { RawUpdateInputDto } from './raw-update-input-dto';

export class RawUpdateArgsDto {
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
    @Type(() => RawUpdateInputDto)
    data: RawUpdateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawWhereUniqueInputDto)
    where: RawWhereUniqueInputDto;
}
