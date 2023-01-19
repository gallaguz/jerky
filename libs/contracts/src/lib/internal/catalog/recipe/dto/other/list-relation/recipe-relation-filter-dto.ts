import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { RecipeWhereInputDto } from '../where';

export class RecipeRelationFilterDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeWhereInputDto)
    @ValidateIf((_, value) => value !== null)
    is?: RecipeWhereInputDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeWhereInputDto)
    @ValidateIf((_, value) => value !== null)
    isNot?: RecipeWhereInputDto | null;
}
