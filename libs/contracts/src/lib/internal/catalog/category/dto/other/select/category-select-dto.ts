import { Prisma } from '@prisma/client/scripts/catalog-client';
import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { BaseCatalogSelectDto } from '../../../../../../common';
import { ProductFindManyArgsDto } from '../../../../product';
import RecipeFindManyArgs = Prisma.RecipeFindManyArgs;

import { CategoryCountOutputTypeArgsDto } from '../count';

export class CategorySelectDto extends BaseCatalogSelectDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    product?: boolean | ProductFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    recipe?: boolean | RecipeFindManyArgs;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryCountOutputTypeArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    _count?: boolean | CategoryCountOutputTypeArgsDto;
}
