import { CategoryIncludeDto, CategorySelectDto } from '@jerky/contracts';
import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

export class CategoryArgsDto {
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
}
