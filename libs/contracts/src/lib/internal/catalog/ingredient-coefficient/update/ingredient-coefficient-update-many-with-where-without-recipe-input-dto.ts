import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { IngredientCoefficientScalarWhereInputDto } from '../other';
import { IngredientCoefficientUpdateManyMutationInputDto } from './ingredient-coefficient-update-many-mutation-input-dto';

export class IngredientCoefficientUpdateManyWithWhereWithoutRecipeInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientScalarWhereInputDto)
    where: IngredientCoefficientScalarWhereInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientUpdateManyMutationInputDto)
    data: IngredientCoefficientUpdateManyMutationInputDto;
}
