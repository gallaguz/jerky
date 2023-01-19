import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { TakeSkip } from '../../../../../common';
import {
    CategoryIncludeDto,
    CategoryOrderByWithRelationInputDto,
    CategorySelectDto,
    CategoryWhereInputDto,
    CategoryWhereUniqueInputDto,
} from '../other';

export class CategoryFindManyArgsDto extends TakeSkip {
    @IsOptional()
    @ValidateNested()
    @Type(() => CategorySelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: CategorySelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: CategoryIncludeDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryWhereInputDto)
    where?: CategoryWhereInputDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CategoryOrderByWithRelationInputDto)
    orderBy?: CategoryOrderByWithRelationInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryWhereUniqueInputDto)
    cursor?: CategoryWhereUniqueInputDto;
}
