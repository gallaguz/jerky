import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { ProductIncludeDto } from '../include';
import { ProductSelectDto } from '../select';

export class ProductArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: ProductSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: ProductIncludeDto | null;
}
