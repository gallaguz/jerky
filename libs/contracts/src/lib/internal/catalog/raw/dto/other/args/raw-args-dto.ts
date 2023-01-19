import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RawIncludeDto } from '../include';
import { RawSelectDto } from '../select';

export class RawArgsDto {
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
}
