import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import {
    RecipeIncludeDto,
    RecipeSelectDto,
    RecipeWhereUniqueInputDto,
} from '../other';
import { RecipeUpdateInputDto } from './recipe-update-input-dto';

export class RecipeUpdateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: RecipeSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: RecipeIncludeDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeUpdateInputDto)
    data: RecipeUpdateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeWhereUniqueInputDto)
    where: RecipeWhereUniqueInputDto;
}
