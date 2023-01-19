import {
    CategorySelectDto,
    DateTimeFilterDto,
    FloatFilterDto,
} from '@jerky/contracts';
import { Type } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    IsUUID,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';

export class IngredientCoefficientScalarWhereInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientScalarWhereInputDto)
    AND?: IngredientCoefficientScalarWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientScalarWhereInputDto)
    OR?: IngredientCoefficientScalarWhereInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientScalarWhereInputDto)
    NOT?: IngredientCoefficientScalarWhereInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => CategorySelectDto)
    createdAt?: DateTimeFilterDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategorySelectDto)
    updatedAt?: DateTimeFilterDto;

    @IsOptional()
    @Max(100)
    @Min(1)
    @IsNumber()
    coefficient?: FloatFilterDto;

    @IsOptional()
    @IsUUID()
    recipeUuid?: string;

    @IsOptional()
    @IsUUID()
    ingredientUuid?: string;
}
