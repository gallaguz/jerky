import { IsBoolean, IsOptional } from 'class-validator';

export class IngredientCoefficientAvgAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    coefficient?: true;
}
