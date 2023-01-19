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

import { ProductOrderByWithRelationInputDto } from '../order-by';
import { ProductWhereInputDto, ProductWhereUniqueInputDto } from '../where';
import { ProductAvgAggregateInputTypeDto } from './product-avg-aggregate-input-type-dto';
import { ProductMaxAggregateInputTypeDto } from './product-max-aggregate-input-type-dto';
import { ProductMinAggregateInputTypeDto } from './product-min-aggregate-input-type-dto';
import { ProductSumAggregateInputTypeDto } from './product-sum-aggregate-input-type-dto';

export class ProductAggregateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductWhereInputDto)
    where?: ProductWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductOrderByWithRelationInputDto)
    orderBy?: ProductOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductWhereUniqueInputDto)
    cursor?: ProductWhereUniqueInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductAvgAggregateInputTypeDto)
    _avg?: ProductAvgAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductSumAggregateInputTypeDto)
    _sum?: ProductSumAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductMinAggregateInputTypeDto)
    _min?: ProductMinAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductMaxAggregateInputTypeDto)
    _max?: ProductMaxAggregateInputTypeDto;

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
