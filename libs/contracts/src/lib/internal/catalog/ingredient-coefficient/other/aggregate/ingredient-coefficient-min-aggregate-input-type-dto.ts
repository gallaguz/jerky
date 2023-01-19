import { IsBoolean, IsOptional } from 'class-validator';

export class IngredientCoefficientMinAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    coefficient?: true;
}
