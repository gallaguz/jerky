import { IsBoolean, IsOptional } from 'class-validator';

export class RawCountOutputTypeSelectDto {
    @IsOptional()
    @IsBoolean()
    product?: boolean;

    @IsOptional()
    @IsBoolean()
    recipe?: boolean;
}
