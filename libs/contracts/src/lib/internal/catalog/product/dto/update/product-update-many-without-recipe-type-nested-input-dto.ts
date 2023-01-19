import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { ProductWhereUniqueInputDto } from '../other';

export class ProductUpdateManyWithoutRecipeTypeNestedInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductWhereUniqueInputDto)
    connect?: ProductWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductWhereUniqueInputDto)
    disconnect?: ProductWhereUniqueInputDto[];
}
