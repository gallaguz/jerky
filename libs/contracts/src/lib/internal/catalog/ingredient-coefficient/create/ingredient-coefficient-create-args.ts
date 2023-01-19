import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import {
    IngredientCoefficientIncludeDto,
    IngredientCoefficientSelectDto,
} from '../other';
import { IngredientCoefficientCreateInputDto } from './ingredient-coefficient-create-input-dto';

export class IngredientCoefficientCreateArgs {
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
    @Type(() => IngredientCoefficientCreateInputDto)
    data: IngredientCoefficientCreateInputDto;
}
