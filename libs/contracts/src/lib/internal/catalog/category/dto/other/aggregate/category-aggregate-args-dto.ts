import { TAKE } from '@jerky/constants';
import {
    CategoryWhereInputDto,
    CategoryWhereUniqueInputDto,
} from '@jerky/contracts';
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

import { CategoryOrderByWithRelationInputDto } from '../order-by/category-order-by-with-relation-input-dto';

export class CategoryAggregateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryWhereInputDto)
    where?: CategoryWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryOrderByWithRelationInputDto)
    orderBy?: CategoryOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryWhereUniqueInputDto)
    cursor?: CategoryWhereUniqueInputDto;

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
