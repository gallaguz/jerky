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

import { RawOrderByWithRelationInputDto } from '../order-by';
import { RawWhereInputDto, RawWhereUniqueInputDto } from '../where';
import { RawAvgAggregateInputTypeDto } from './raw-avg-aggregate-input-type-dto';
import { RawMaxAggregateInputTypeDto } from './raw-max-aggregate-input-type-dto';
import { RawMinAggregateInputTypeDto } from './raw-min-aggregate-input-type-dto';
import { RawSumAggregateInputTypeDto } from './raw-sum-aggregate-input-type-dto';

export class RawAggregateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RawWhereInputDto)
    where?: RawWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RawOrderByWithRelationInputDto)
    orderBy?: RawOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => RawWhereUniqueInputDto)
    cursor?: RawWhereUniqueInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawAvgAggregateInputTypeDto)
    _avg?: RawAvgAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawSumAggregateInputTypeDto)
    _sum?: RawSumAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawMinAggregateInputTypeDto)
    _min?: RawMinAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawMaxAggregateInputTypeDto)
    _max?: RawMaxAggregateInputTypeDto;

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
