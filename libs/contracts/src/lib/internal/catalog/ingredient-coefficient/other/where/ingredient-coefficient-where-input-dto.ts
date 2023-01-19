import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class IngredientCoefficientWhereInputDto {
    @IsOptional()
    @Max(100)
    @Min(1)
    @IsNumber()
    coefficient?: number;
    @IsOptional()
    @IsString()
    recipeUuid?: string;
    @IsOptional()
    @IsString()
    ingredientUuid?: string;
}
