import { IsBoolean, IsOptional } from 'class-validator';

export class ProductCountAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    createdAt?: true;

    @IsOptional()
    @IsBoolean()
    updatedAt?: true;

    @IsOptional()
    @IsBoolean()
    alias?: true;

    @IsOptional()
    @IsBoolean()
    title?: true;

    @IsOptional()
    @IsBoolean()
    description?: true;

    @IsOptional()
    @IsBoolean()
    price?: true;
}
