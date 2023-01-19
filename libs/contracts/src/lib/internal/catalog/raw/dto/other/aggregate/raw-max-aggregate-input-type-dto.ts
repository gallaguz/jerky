import { IsBoolean, IsOptional } from 'class-validator';

export class RawMaxAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    price?: true;

    @IsOptional()
    @IsBoolean()
    payload?: true;
}
