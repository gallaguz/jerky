import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import {
    RawTypeIncludeDto,
    RawTypeSelectDto,
    RawTypeWhereUniqueInputDto,
} from '../other';
import { RawTypeUpdateInputDto } from './raw-type-update-input-dto';

export class RawTypeUpdateArgsDto {
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
    @Type(() => RawTypeUpdateInputDto)
    data: RawTypeUpdateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeWhereUniqueInputDto)
    where: RawTypeWhereUniqueInputDto;
}
