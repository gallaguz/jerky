import { IngredientWhereUniqueInputDto } from '@jerky/contracts';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';

export class IngredientUpdateOneWithoutIngredientCoefficientNestedInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientWhereUniqueInputDto)
    connect?: IngredientWhereUniqueInputDto;

    @IsOptional()
    @IsBoolean()
    disconnect?: boolean;
}
