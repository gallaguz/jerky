import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import {
    CategoryIncludeDto,
    CategorySelectDto,
    CategoryWhereUniqueInputDto,
} from '../other';
import { CategoryUpdateInputDto } from './category-update-input-dto';

export class CategoryUpdateArgsDto {
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
    @Type(() => CategoryUpdateInputDto)
    data: CategoryUpdateInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryWhereUniqueInputDto)
    where: CategoryWhereUniqueInputDto;
}
