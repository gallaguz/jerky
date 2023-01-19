import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { IngredientCountOutputTypeSelectDto } from './ingredient-count-output-type-select-dto';

export class IngredientCountOutputTypeArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCountOutputTypeSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: IngredientCountOutputTypeSelectDto | null;
}
