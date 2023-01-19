import { TAKE } from '@jerky/constants';
import {
    IngredientOrderByWithRelationInputDto,
    IngredientWhereInputDto,
    IngredientWhereUniqueInputDto,
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

import { IngredientAvgAggregateInputTypeDto } from './ingredient-avg-aggregate-input-type-dto';
import { IngredientMaxAggregateInputTypeDto } from './ingredient-max-aggregate-input-type-dto';
import { IngredientMinAggregateInputTypeDto } from './ingredient-min-aggregate-input-type-dto';
import { IngredientSumAggregateInputTypeDto } from './ingredient-sum-aggregate-input-type-dto';

export class IngredientAggregateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientWhereInputDto)
    where?: IngredientWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientOrderByWithRelationInputDto)
    orderBy?: IngredientOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientWhereUniqueInputDto)
    cursor?: IngredientWhereUniqueInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientAvgAggregateInputTypeDto)
    _avg?: IngredientAvgAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientSumAggregateInputTypeDto)
    _sum?: IngredientSumAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientMinAggregateInputTypeDto)
    _min?: IngredientMinAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientMaxAggregateInputTypeDto)
    _max?: IngredientMaxAggregateInputTypeDto;

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
