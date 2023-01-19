import { DateTimeFieldUpdateOperationsInputDto } from '@jerky/contracts';
import { Type } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';

import { IngredientUpdateOneWithoutIngredientCoefficientNestedInputDto } from '../../ingredient/dto/update/ingredient-update-one-without-ingredient-coefficient-nested-input-dto';

export class IngredientCoefficientUpdateWithoutRecipeInputDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => DateTimeFieldUpdateOperationsInputDto)
    createdAt?: DateTimeFieldUpdateOperationsInputDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => DateTimeFieldUpdateOperationsInputDto)
    updatedAt?: DateTimeFieldUpdateOperationsInputDto;

    @IsOptional()
    @Max(100)
    @Min(1)
    @IsNumber()
    coefficient?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientUpdateOneWithoutIngredientCoefficientNestedInputDto)
    ingredient?: IngredientUpdateOneWithoutIngredientCoefficientNestedInputDto;
}
