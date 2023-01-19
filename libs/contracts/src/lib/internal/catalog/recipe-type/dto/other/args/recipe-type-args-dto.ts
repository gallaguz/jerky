import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RecipeTypeIncludeDto } from '../include';
import { RecipeTypeSelectDto } from '../select';

export class RecipeTypeArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: RecipeTypeSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: RecipeTypeIncludeDto | null;
}
