import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RawIncludeDto, RawSelectDto, RawWhereUniqueInputDto } from '../other';

export class RawDeleteArgsDto {
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
    @Type(() => RawWhereUniqueInputDto)
    where: RawWhereUniqueInputDto;
}
