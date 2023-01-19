import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import {
    CategoryIncludeDto,
    CategorySelectDto,
    CategoryWhereUniqueInputDto,
} from '../other';

export class CategoryFindUniqueOrThrowDto {
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
    @Type(() => CategoryWhereUniqueInputDto)
    where: CategoryWhereUniqueInputDto;
}
