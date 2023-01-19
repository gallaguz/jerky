import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { IngredientIncludeDto } from '../include';
import { IngredientSelectDto } from '../select';

export class IngredientArgsDto {
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
}
