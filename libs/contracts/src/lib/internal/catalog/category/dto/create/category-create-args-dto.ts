import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import { CategoryIncludeDto, CategorySelectDto } from '../other';
import { CategoryCreateInputDto } from './category-create-input-dto';

export class CategoryCreateArgsDto {
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

    @ValidateNested()
    @Type(() => CategoryCreateInputDto)
    data: CategoryCreateInputDto;
}
