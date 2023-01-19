import { IsBoolean, IsOptional } from 'class-validator';

export class RawSumAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    price?: true;

    @IsOptional()
    @IsBoolean()
    payload?: true;
}
