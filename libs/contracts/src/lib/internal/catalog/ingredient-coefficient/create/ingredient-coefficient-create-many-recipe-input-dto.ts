import { IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';

export class IngredientCoefficientCreateManyRecipeInputDto {
    @Max(100)
    @Min(1)
    @IsNumber()
    coefficient: number;

    @IsOptional()
    @IsUUID()
    ingredientUuid?: string;
}
