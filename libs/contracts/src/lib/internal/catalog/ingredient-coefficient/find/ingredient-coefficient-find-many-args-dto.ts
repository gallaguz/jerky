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

import {
    IngredientCoefficientIncludeDto,
    IngredientCoefficientSelectDto,
    IngredientCoefficientWhereInputDto,
} from '../other';

export class IngredientCoefficientFindManyArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: IngredientCoefficientSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: IngredientCoefficientIncludeDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereInputDto)
    where?: IngredientCoefficientWhereInputDto;

    @IsPositive()
    @Max(TAKE.MAX)
    @Min(TAKE.MIN)
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @NotEquals(null)
    @ValidateIf((_, value) => value !== undefined)
    take?: number;

    @IsPositive()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @NotEquals(null)
    @ValidateIf((_, value) => value !== undefined)
    skip?: number;
}
