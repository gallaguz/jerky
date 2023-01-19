import { IsBoolean, IsOptional } from 'class-validator';

export class CategoryCountOutputTypeSelectDto {
    @IsOptional()
    @IsBoolean()
    product?: boolean;

    @IsOptional()
    @IsBoolean()
    recipe?: boolean;
}
