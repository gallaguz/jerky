import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RecipeTypeIncludeDto, RecipeTypeSelectDto } from '../other';
import { RecipeTypeCreateInputDto } from './recipe-type-create-input-dto';

export class RecipeTypeCreateArgsDto {
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

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeCreateInputDto)
    data: RecipeTypeCreateInputDto;
}
