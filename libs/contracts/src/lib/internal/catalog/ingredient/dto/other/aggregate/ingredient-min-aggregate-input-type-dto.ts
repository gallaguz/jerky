import { IsBoolean, IsOptional } from 'class-validator';

export class IngredientMinAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    price?: true;

    @IsOptional()
    @IsBoolean()
    payload?: true;
}
