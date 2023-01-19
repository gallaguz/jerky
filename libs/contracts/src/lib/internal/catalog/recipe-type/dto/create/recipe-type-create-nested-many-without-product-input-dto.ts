import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { RecipeTypeWhereUniqueInputDto } from '../other';

export class RecipeTypeCreateNestedManyWithoutProductInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeTypeWhereUniqueInputDto)
    connect?: RecipeTypeWhereUniqueInputDto[];
}
