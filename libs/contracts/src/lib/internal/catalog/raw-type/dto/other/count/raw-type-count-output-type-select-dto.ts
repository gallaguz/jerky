import { IsBoolean, IsOptional } from 'class-validator';

export class RawTypeCountOutputTypeSelectDto {
    @IsOptional()
    @IsBoolean()
    product?: boolean;

    @IsOptional()
    @IsBoolean()
    recipe?: boolean;
}
