import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
} from 'class-validator';
import { IUser } from '@jerky/interfaces';
import { Role } from '@jerky/enums';
import { ERROR_MESSAGES } from '@jerky/constants';

export namespace UserUpdate {
    export const topic = 'user.update.command';

    export class Request {
        @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
        @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
        uuid: string;

        @IsOptional()
        @IsString({ message: ERROR_MESSAGES.PASSWORD.MUST_BE_A_STRING })
        @MinLength(8, { message: ERROR_MESSAGES.PASSWORD.MUST_BE_LONGER })
        @MaxLength(64, { message: ERROR_MESSAGES.PASSWORD.MUST_BE_SHORTER })
        password?: string;

        @IsOptional()
        @IsEmail()
        email?: string;

        @IsOptional()
        @IsEnum(Role)
        role?: Role;
    }

    export type Response = IUser;
}
