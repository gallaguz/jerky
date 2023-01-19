import { IsBoolean, IsOptional } from 'class-validator';

export class IngredientMaxAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    price?: true;

    @IsOptional()
    @IsBoolean()
    payload?: true;
}
