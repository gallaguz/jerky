import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RawWhereInputDto } from '../where';

export class RawListRelationFilterDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RawWhereInputDto)
    every?: RawWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawWhereInputDto)
    some?: RawWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawWhereInputDto)
    none?: RawWhereInputDto;
}
