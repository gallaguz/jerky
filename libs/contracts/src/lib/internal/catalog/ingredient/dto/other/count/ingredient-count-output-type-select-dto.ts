import { IsBoolean, IsOptional } from 'class-validator';

export class IngredientCountOutputTypeSelectDto {
    @IsOptional()
    @IsBoolean()
    ingredientCoefficient?: boolean;
}
