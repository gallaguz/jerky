import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import {
    IngredientCoefficientIncludeDto,
    IngredientCoefficientSelectDto,
    IngredientCoefficientWhereUniqueInputDto,
} from '../other';
import { IngredientCoefficientUpdateInputDto } from './ingredient-coefficient-update-input-dto';

export class IngredientCoefficientUpdateArgsDto {
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
    @Type(() => IngredientCoefficientUpdateInputDto)
    data: IngredientCoefficientUpdateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientWhereUniqueInputDto)
    where: IngredientCoefficientWhereUniqueInputDto;
}
