import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RawTypeWhereInputDto } from '../where';

export class RawTypeListRelationFilterDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeWhereInputDto)
    every?: RawTypeWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeWhereInputDto)
    some?: RawTypeWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeWhereInputDto)
    none?: RawTypeWhereInputDto;
}
