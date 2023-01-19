import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RecipeTypeCountOutputTypeSelectDto } from './recipe-type-count-output-type-select-dto';

export class RecipeTypeCountOutputTypeArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeCountOutputTypeSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: RecipeTypeCountOutputTypeSelectDto | null;
}
