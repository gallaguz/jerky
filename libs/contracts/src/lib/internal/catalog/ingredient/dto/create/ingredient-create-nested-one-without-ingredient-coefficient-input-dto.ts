import { IngredientWhereUniqueInputDto } from '@jerky/contracts';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

export class IngredientCreateNestedOneWithoutIngredientCoefficientInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientWhereUniqueInputDto)
    connect?: IngredientWhereUniqueInputDto;
}
