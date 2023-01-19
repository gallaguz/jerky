import { IsBoolean, IsOptional } from 'class-validator';

export class RecipeTypeCountOutputTypeSelectDto {
    @IsOptional()
    @IsBoolean()
    product?: boolean;

    @IsOptional()
    @IsBoolean()
    recipe?: boolean;
}
