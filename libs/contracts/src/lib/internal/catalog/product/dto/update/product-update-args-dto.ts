import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import {
    ProductIncludeDto,
    ProductSelectDto,
    ProductWhereUniqueInputDto,
} from '../other';
import { ProductUpdateInputDto } from './product-update-input-dto';

export class ProductUpdateArgsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: ProductSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: ProductIncludeDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductUpdateInputDto)
    data: ProductUpdateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductWhereUniqueInputDto)
    where: ProductWhereUniqueInputDto;
}
