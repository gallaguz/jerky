import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { CategoryWhereUniqueInputDto } from '../other';

export class CategoryUpdateManyWithoutProductNestedInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryWhereUniqueInputDto)
    disconnect?: CategoryWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryWhereUniqueInputDto)
    connect?: CategoryWhereUniqueInputDto[];
}
