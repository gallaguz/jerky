import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { TakeSkip } from '../../../../../common';
import {
    ProductIncludeDto,
    ProductOrderByWithRelationInputDto,
    ProductSelectDto,
    ProductWhereInputDto,
    ProductWhereUniqueInputDto,
} from '../other';

export class ProductFindManyArgsDto extends TakeSkip {
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
    @Type(() => ProductWhereInputDto)
    where?: ProductWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ProductOrderByWithRelationInputDto)
    orderBy?: ProductOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => ProductWhereUniqueInputDto)
    cursor?: ProductWhereUniqueInputDto;
}
