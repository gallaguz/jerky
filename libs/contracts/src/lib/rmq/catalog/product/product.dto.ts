import {
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUUID,
    Min,
    ValidatorConstraint,
} from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';
import { BaseCatalogDto } from '../../../common';

@ValidatorConstraint({ async: true })
export class ProductDto extends BaseCatalogDto {
    @IsOptional()
    @Min(0)
    @IsPositive()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
    @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
    recipeTypeUuid?: string;

    @IsOptional()
    @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
    @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
    categoryUuid?: string;

    @IsOptional()
    @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
    @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
    rawUuid?: string;

    @IsOptional()
    @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
    @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
    recipeUuid?: string;
}
