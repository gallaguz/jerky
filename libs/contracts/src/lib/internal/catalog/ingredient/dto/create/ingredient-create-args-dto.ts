import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { IngredientIncludeDto, IngredientSelectDto } from '../other';
import { IngredientCreateInputDto } from './ingredient-create-input-dto';

export class IngredientCreateArgsDto {
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

    @ValidateNested()
    @Type(() => IngredientCreateInputDto)
    data: IngredientCreateInputDto;
}
