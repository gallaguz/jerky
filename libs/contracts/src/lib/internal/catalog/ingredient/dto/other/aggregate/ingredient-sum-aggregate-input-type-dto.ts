import { IsBoolean, IsOptional } from 'class-validator';

export class IngredientSumAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    price?: true;

    @IsOptional()
    @IsBoolean()
    payload?: true;
}
