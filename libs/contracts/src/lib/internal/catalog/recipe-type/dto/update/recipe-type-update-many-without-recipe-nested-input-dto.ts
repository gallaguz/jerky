import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RecipeTypeWhereUniqueInputDto } from '../other';

export class RecipeTypeUpdateManyWithoutRecipeNestedInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeTypeWhereUniqueInputDto)
    disconnect?: RecipeTypeWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeTypeWhereUniqueInputDto)
    connect?: RecipeTypeWhereUniqueInputDto[];
}
