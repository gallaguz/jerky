import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RawCountOutputTypeSelectDto } from './raw-count-output-type-select-dto';

export class RawCountOutputTypeArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RawCountOutputTypeSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: RawCountOutputTypeSelectDto | null;
}
