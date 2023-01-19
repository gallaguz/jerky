import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RawTypeIncludeDto } from '../include';
import { RawTypeSelectDto } from '../select';

export class RawTypeArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeSelectDto)
    select?: RawTypeSelectDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeIncludeDto)
    include?: RawTypeIncludeDto;
}
