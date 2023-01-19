import { TAKE } from '@jerky/constants';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsPositive,
    Max,
    Min,
    NotEquals,
    ValidateIf,
    ValidateNested,
} from 'class-validator';

import { RawTypeOrderByWithRelationInputDto } from '../order-by';
import { RawTypeWhereInputDto, RawTypeWhereUniqueInputDto } from '../where';

export class RawTypeAggregateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeWhereInputDto)
    where?: RawTypeWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawTypeOrderByWithRelationInputDto)
    orderBy?: RawTypeOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeWhereUniqueInputDto)
    cursor?: RawTypeWhereUniqueInputDto;

    @IsOptional()
    @IsPositive()
    @Max(TAKE.MAX)
    @Min(TAKE.MIN)
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @NotEquals(null)
    @ValidateIf((_, value) => value !== undefined)
    take?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @NotEquals(null)
    @ValidateIf((_, value) => value !== undefined)
    skip?: number;

    @IsOptional()
    @IsBoolean()
    _count?: true;
}
