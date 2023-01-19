import { DateTimeFieldUpdateOperationsInputDto } from '@jerky/contracts';
import { Type } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';

export class IngredientCoefficientUpdateManyMutationInputDto {
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
}
