import {
    DateTimeFieldUpdateOperationsInputDto,
    FloatFieldUpdateOperationsInputDto,
} from '@jerky/contracts';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { IngredientUpdateOneWithoutIngredientCoefficientNestedInputDto } from '../../ingredient';
import { RecipeUpdateOneWithoutIngredientCoefficientNestedInputDto } from '../../recipe';

export class IngredientCoefficientUpdateInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => DateTimeFieldUpdateOperationsInputDto)
    createdAt?: DateTimeFieldUpdateOperationsInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => DateTimeFieldUpdateOperationsInputDto)
    updatedAt?: DateTimeFieldUpdateOperationsInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => FloatFieldUpdateOperationsInputDto)
    coefficient?: FloatFieldUpdateOperationsInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => RecipeUpdateOneWithoutIngredientCoefficientNestedInputDto)
    recipe?: RecipeUpdateOneWithoutIngredientCoefficientNestedInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientUpdateOneWithoutIngredientCoefficientNestedInputDto)
    ingredient?: IngredientUpdateOneWithoutIngredientCoefficientNestedInputDto;
}
