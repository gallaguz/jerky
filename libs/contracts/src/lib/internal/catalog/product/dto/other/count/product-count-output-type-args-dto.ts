import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { ProductCountOutputTypeSelectDto } from './product-count-output-type-select-dto';

export class ProductCountOutputTypeArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductCountOutputTypeSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: ProductCountOutputTypeSelectDto | null;
}
