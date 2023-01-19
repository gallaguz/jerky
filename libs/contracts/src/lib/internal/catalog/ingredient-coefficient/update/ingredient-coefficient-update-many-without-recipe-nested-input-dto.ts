import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { IngredientCoefficientCreateManyRecipeInputEnvelopeDto } from '../create/ingredient-coefficient-create-many-recipe-input-envelope-dto';
import { IngredientCoefficientCreateOrConnectWithoutRecipeInputDto } from '../create/ingredient-coefficient-create-or-connect-without-recipe-input-dto';
import { IngredientCoefficientCreateWithoutRecipeInputDto } from '../create/ingredient-coefficient-create-without-recipe-input-dto';
import { IngredientCoefficientScalarWhereInputDto } from '../other/where/ingredient-coefficient-scalar-where-input-dto';
import { IngredientCoefficientWhereUniqueInputDto } from '../other/where/ingredient-coefficient-where-unique-input-dto';
import { IngredientCoefficientUpsertWithWhereUniqueWithoutRecipeInputDto } from '../upsert/ingredient-coefficient-upsert-with-where-unique-without-recipe-input-dto';
import { IngredientCoefficientUpdateManyWithWhereWithoutRecipeInputDto } from './ingredient-coefficient-update-many-with-where-without-recipe-input-dto';
import { IngredientCoefficientUpdateWithWhereUniqueWithoutRecipeInputDto } from './ingredient-coefficient-update-with-where-unique-without-recipe-input-dto';

export class IngredientCoefficientUpdateManyWithoutRecipeNestedInputDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientCreateWithoutRecipeInputDto)
    create?: IngredientCoefficientCreateWithoutRecipeInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientCreateOrConnectWithoutRecipeInputDto)
    connectOrCreate?: IngredientCoefficientCreateOrConnectWithoutRecipeInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientUpsertWithWhereUniqueWithoutRecipeInputDto)
    upsert?: IngredientCoefficientUpsertWithWhereUniqueWithoutRecipeInputDto[];

    @IsOptional()
    @ValidateNested()
    @Type(() => IngredientCoefficientCreateManyRecipeInputEnvelopeDto)
    createMany?: IngredientCoefficientCreateManyRecipeInputEnvelopeDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientWhereUniqueInputDto)
    set?: IngredientCoefficientWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientWhereUniqueInputDto)
    disconnect?: IngredientCoefficientWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientWhereUniqueInputDto)
    delete?: IngredientCoefficientWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientWhereUniqueInputDto)
    connect?: IngredientCoefficientWhereUniqueInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientUpdateWithWhereUniqueWithoutRecipeInputDto)
    update?: IngredientCoefficientUpdateWithWhereUniqueWithoutRecipeInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientUpdateManyWithWhereWithoutRecipeInputDto)
    updateMany?: IngredientCoefficientUpdateManyWithWhereWithoutRecipeInputDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IngredientCoefficientScalarWhereInputDto)
    deleteMany?: IngredientCoefficientScalarWhereInputDto[];
}
