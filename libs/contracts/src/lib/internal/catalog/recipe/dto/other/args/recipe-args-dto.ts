import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RecipeIncludeDto } from '../include';
import { RecipeSelectDto } from '../select';

export class RecipeArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: RecipeSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: RecipeIncludeDto | null;
}
