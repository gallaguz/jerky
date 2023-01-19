import { IsBoolean, IsOptional } from 'class-validator';

export class RawMinAggregateInputTypeDto {
    @IsOptional()
    @IsBoolean()
    price?: true;

    @IsOptional()
    @IsBoolean()
    payload?: true;
}
