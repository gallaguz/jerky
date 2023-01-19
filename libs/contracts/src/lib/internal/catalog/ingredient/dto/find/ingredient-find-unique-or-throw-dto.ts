import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, ValidateNested } from 'class-validator';

import {
    IngredientIncludeDto,
    IngredientSelectDto,
    IngredientWhereUniqueInputDto,
} from '../other';

export class IngredientFindUniqueOrThrowDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientSelectDto)
    @ValidateIf((_, value) => value !== null)
    select?: IngredientSelectDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientIncludeDto)
    @ValidateIf((_, value) => value !== null)
    include?: IngredientIncludeDto | null;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientWhereUniqueInputDto)
    where: IngredientWhereUniqueInputDto;
}
