import { TAKE } from '@jerky/constants';
import { Type } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    IsPositive,
    Max,
    Min,
    NotEquals,
    ValidateIf,
    ValidateNested,
} from 'class-validator';

import { IngredientCoefficientOrderByWithRelationInputDto } from '../order-by/ingredient-coefficient-order-by-with-relation-input-dto';
import { IngredientCoefficientWhereInputDto } from '../where/ingredient-coefficient-where-input-dto';
import { IngredientCoefficientWhereUniqueInputDto } from '../where/ingredient-coefficient-where-unique-input-dto';
import { IngredientCoefficientAvgAggregateInputTypeDto } from './ingredient-coefficient-avg-aggregate-input-type-dto';
import { IngredientCoefficientMaxAggregateInputTypeDto } from './ingredient-coefficient-max-aggregate-input-type-dto';
import { IngredientCoefficientMinAggregateInputTypeDto } from './ingredient-coefficient-min-aggregate-input-type-dto';
import { IngredientCoefficientSumAggregateInputTypeDto } from './ingredient-coefficient-sum-aggregate-input-type-dto';

export class IngredientCoefficientAggregateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereInputDto)
    where?: IngredientCoefficientWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientOrderByWithRelationInputDto)
    orderBy?: IngredientCoefficientOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereUniqueInputDto)
    cursor?: IngredientCoefficientWhereUniqueInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientAvgAggregateInputTypeDto)
    _avg?: IngredientCoefficientAvgAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientSumAggregateInputTypeDto)
    _sum?: IngredientCoefficientSumAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientMinAggregateInputTypeDto)
    _min?: IngredientCoefficientMinAggregateInputTypeDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientMaxAggregateInputTypeDto)
    _max?: IngredientCoefficientMaxAggregateInputTypeDto;

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

    _count?: true;
}
