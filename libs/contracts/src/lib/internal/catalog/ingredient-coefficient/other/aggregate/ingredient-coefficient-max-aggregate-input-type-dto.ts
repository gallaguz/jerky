import { IsBoolean, IsOptional } from 'class-validator';

export class IngredientCoefficientMaxAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    coefficient?: true;
}
