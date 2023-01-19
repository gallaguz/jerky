import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { TakeSkip } from '../../../../../common';
import {
    RecipeIncludeDto,
    RecipeOrderByWithRelationInputDto,
    RecipeSelectDto,
    RecipeWhereInputDto,
    RecipeWhereUniqueInputDto,
} from '../other';

export class RecipeFindManyArgsDto extends TakeSkip {
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
    @Type(() => RecipeWhereInputDto)
    where?: RecipeWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeOrderByWithRelationInputDto)
    orderBy?: RecipeOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeWhereUniqueInputDto)
    cursor?: RecipeWhereUniqueInputDto;
}
