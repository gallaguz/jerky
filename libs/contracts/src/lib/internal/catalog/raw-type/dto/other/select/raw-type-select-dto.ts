import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { BaseCatalogSelectDto } from '../../../../../../common';
import { ProductFindManyArgsDto } from '../../../../product';
import { RecipeFindManyArgsDto } from '../../../../recipe';
import { RawTypeCountOutputTypeArgsDto } from '../count';

export class RawTypeSelectDto extends BaseCatalogSelectDto {
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
    @Type(() => RawTypeCountOutputTypeArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    _count?: boolean | RawTypeCountOutputTypeArgsDto;
}
