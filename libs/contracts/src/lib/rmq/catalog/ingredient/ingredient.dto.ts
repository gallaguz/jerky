import {
    IsArray,
    IsEnum,
    IsNumber,
    IsObject,
    IsOptional,
    IsPositive,
    ValidateNested,
} from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';
import { IngredientForm } from '@prisma/client/scripts/catalog-client';
import { BaseCatalogDto } from '../../../common';
import {
    ConnectionActions,
    IngredientConnectionModelNames,
} from '@jerky/enums';
import { Type } from 'class-transformer';

// class IIngredientQtyDto {
//     uuid: string;
//     qtyPerKg: number;
// }
//
// class IngredientQtyConnection {
//     @IsEnum(IngredientConnectionModelNames)
//     model: IngredientConnectionModelNames;
//
//     @IsEnum(ConnectionActions)
//     action: ConnectionActions;
//
//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => IIngredientQtyDto)
//     data: IIngredientQtyDto[];
// }

export class IngredientDto extends BaseCatalogDto {
    @IsPositive({ message: ERROR_MESSAGES.PRICE.MUST_BE_A_POSITIVE })
    @IsNumber({}, { message: ERROR_MESSAGES.PRICE.MUST_BE_A_NUMBER })
    price: number;

    @IsOptional()
    @IsEnum(IngredientForm, {
        message: ERROR_MESSAGES.IngredientFormE.MUST_BE_ONE_OF_THIS,
    })
    form?: IngredientForm;

    // @IsObject()
    // @ValidateNested()
    // @Type(() => IngredientQtyConnection)
    // ingredientQtyConnection?: IngredientQtyConnection;
}
