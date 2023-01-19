import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RawIncludeDto, RawSelectDto } from '../other';
import { RawCreateInputDto } from './raw-create-input-dto';

export class RawCreateArgsDto {
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
    @Type(() => RawCreateInputDto)
    data: RawCreateInputDto;
}
