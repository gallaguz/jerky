import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { CategoryCountOutputTypeSelectDto } from './category-count-output-type-select-dto';

export class CategoryCountOutputTypeArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryCountOutputTypeSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: CategoryCountOutputTypeSelectDto | null;
}
