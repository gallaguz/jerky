import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RawTypeIncludeDto, RawTypeSelectDto } from '../other';
import { RawTypeCreateInputDto } from './raw-type-create-input-dto';

export class RawTypeCreateArgsDto {
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
    @Type(() => RawTypeCreateInputDto)
    data: RawTypeCreateInputDto;
}
