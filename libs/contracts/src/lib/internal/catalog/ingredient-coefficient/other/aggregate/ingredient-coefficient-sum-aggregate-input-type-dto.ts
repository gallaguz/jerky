import { IsBoolean, IsOptional } from 'class-validator';

export class IngredientCoefficientSumAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    coefficient?: true;
}
