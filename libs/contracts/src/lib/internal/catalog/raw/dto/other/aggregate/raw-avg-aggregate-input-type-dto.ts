import { IsBoolean, IsOptional } from 'class-validator';

export class RawAvgAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    price?: true;

    @IsOptional()
    @IsBoolean()
    payload?: true;
}
