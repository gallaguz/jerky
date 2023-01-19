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

import { TakeSkip } from '../../../../../common';
import {
    IngredientIncludeDto,
    IngredientOrderByWithRelationInputDto,
    IngredientSelectDto,
    IngredientWhereInputDto,
    IngredientWhereUniqueInputDto,
} from '../other';

export class IngredientFindManyArgsDto extends TakeSkip {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: IngredientSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: IngredientIncludeDto | null;

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
}
