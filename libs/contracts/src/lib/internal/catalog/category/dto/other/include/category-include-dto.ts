import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { ProductFindManyArgsDto } from '../../../../product';
import { RecipeFindManyArgsDto } from '../../../../recipe';
import { CategoryCountOutputTypeArgsDto } from '../count';

export class CategoryIncludeDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    product?: boolean | ProductFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    recipe?: boolean | RecipeFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryCountOutputTypeArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    _count?: boolean | CategoryCountOutputTypeArgsDto;
}
