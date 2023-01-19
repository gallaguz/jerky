import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { IngredientCoefficientIncludeDto } from '../include';
import { IngredientCoefficientSelectDto } from '../select';

export class IngredientCoefficientArgsDto {
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
}
