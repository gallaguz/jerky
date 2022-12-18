import {
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';

export class BaseCatalogDto {
    @IsOptional()
    @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
    @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
    uuid?: string;

    @IsOptional()
    @MaxLength(128, { message: ERROR_MESSAGES.TITLE.MUST_BE_SHORTER })
    @MinLength(4, { message: ERROR_MESSAGES.TITLE.MUST_BE_LONGER })
    @IsString({ message: ERROR_MESSAGES.TITLE.MUST_BE_A_STRING })
    title?: string;

    @IsOptional()
    @IsString({ message: ERROR_MESSAGES.DESCRIPTION.MUST_BE_A_STRING })
    description?: string;
}
