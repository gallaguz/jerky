import { RecipeWhereUniqueInputDto } from '@jerky/contracts';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

export class RecipeUpdateManyWithoutRecipeTypeNestedInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeWhereUniqueInputDto)
    connect?: RecipeWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RecipeWhereUniqueInputDto)
    disconnect?: RecipeWhereUniqueInputDto[];
}
