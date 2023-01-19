import {
    CategoryFindManyArgsDto,
    ProductCountOutputTypeArgsDto,
    RawFindManyArgsDto,
    RawTypeFindManyArgsDto,
    RecipeArgsDto,
    RecipeTypeFindManyArgsDto,
} from '@jerky/contracts';
import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

export class ProductIncludeDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    recipe?: boolean | RecipeArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    category?: boolean | CategoryFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    raw?: boolean | RawFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RawTypeFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    rawType?: boolean | RawTypeFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeFindManyArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    recipeType?: boolean | RecipeTypeFindManyArgsDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductCountOutputTypeArgsDto)
    @ValidateIf((_, value) => typeof value !== 'boolean')
    _count?: boolean | ProductCountOutputTypeArgsDto;
}
