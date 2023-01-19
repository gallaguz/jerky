import { CategoryWhereUniqueInputDto } from '@jerky/contracts';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

export class CategoryUpdateManyWithoutRecipeNestedInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryWhereUniqueInputDto)
    disconnect?: CategoryWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryWhereUniqueInputDto)
    connect?: CategoryWhereUniqueInputDto[];
}
