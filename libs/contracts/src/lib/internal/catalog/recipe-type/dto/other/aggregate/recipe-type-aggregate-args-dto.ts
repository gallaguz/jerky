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

import { RecipeTypeOrderByWithRelationInputDto } from '../order-by/recipe-type-order-by-with-relation-input-dto';
import { RecipeTypeWhereInputDto } from '../where/recipe-type-where-input-dto';
import { RecipeTypeWhereUniqueInputDto } from '../where/recipe-type-where-unique-input-dto';

export class RecipeTypeAggregateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeWhereInputDto)
    where?: RecipeTypeWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeTypeOrderByWithRelationInputDto)
    orderBy?: RecipeTypeOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeWhereUniqueInputDto)
    cursor?: RecipeTypeWhereUniqueInputDto;

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
