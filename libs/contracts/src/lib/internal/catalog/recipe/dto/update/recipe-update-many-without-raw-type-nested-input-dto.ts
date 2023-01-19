import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RecipeWhereUniqueInputDto } from '../other';

export class RecipeUpdateManyWithoutRawTypeNestedInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeWhereUniqueInputDto)
    connect?: RecipeWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeWhereUniqueInputDto)
    disconnect?: RecipeWhereUniqueInputDto[];
}
