import { IsBoolean, IsOptional } from 'class-validator';

export class ProductCountOutputTypeSelectDto {
    @IsOptional()
    @IsBoolean()
    category?: boolean;

    @IsOptional()
    @IsBoolean()
    raw?: boolean;

    @IsOptional()
    @IsBoolean()
    rawType?: boolean;

    @IsOptional()
    @IsBoolean()
    recipeType?: boolean;
}
