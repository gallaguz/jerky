import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { TakeSkip } from '../../../../../common';
import {
    RecipeTypeIncludeDto,
    RecipeTypeOrderByWithRelationInputDto,
    RecipeTypeSelectDto,
    RecipeTypeWhereInputDto,
    RecipeTypeWhereUniqueInputDto,
} from '../other';

export class RecipeTypeFindManyArgsDto extends TakeSkip {
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
    @Type(() => RecipeTypeWhereInputDto)
    where?: RecipeTypeWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeTypeOrderByWithRelationInputDto)
    orderBy?: RecipeTypeOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeWhereUniqueInputDto)
    cursor?: RecipeTypeWhereUniqueInputDto;
}
