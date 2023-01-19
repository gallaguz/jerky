import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RawTypeCountOutputTypeSelectDto } from './raw-type-count-output-type-select-dto';

export class RawTypeCountOutputTypeArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeCountOutputTypeSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: RawTypeCountOutputTypeSelectDto | null;
}
