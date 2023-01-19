import { CategoryWhereUniqueInputDto } from '@jerky/contracts';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

export class CategoryCreateNestedManyWithoutProductInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryWhereUniqueInputDto)
    connect?: CategoryWhereUniqueInputDto[];
}
