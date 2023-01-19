import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { ProductIncludeDto, ProductSelectDto } from '../other';
import { ProductCreateInputDto } from './product-create-input-dto';

export class ProductCreateArgsDto {
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
    @Type(() => ProductCreateInputDto)
    data: ProductCreateInputDto;
}
