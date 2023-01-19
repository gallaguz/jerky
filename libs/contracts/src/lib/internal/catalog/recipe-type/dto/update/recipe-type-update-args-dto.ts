import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import {
    RecipeTypeIncludeDto,
    RecipeTypeSelectDto,
    RecipeTypeWhereUniqueInputDto,
} from '../other';
import { RecipeTypeUpdateInputDto } from './recipe-type-update-input-dto';

export class RecipeTypeUpdateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: RecipeTypeSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: RecipeTypeIncludeDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeUpdateInputDto)
    data: RecipeTypeUpdateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeWhereUniqueInputDto)
    where: RecipeTypeWhereUniqueInputDto;
}
