import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';
import { Role } from '@jerky/enums';
import { IUser } from '@jerky/interfaces';

export namespace UserCreate {
    export const topic = 'user.create.command';

    export class Request {
        @IsEmail({}, { message: ERROR_MESSAGES.EMAIL.MUST_BE_A_VALID_EMAIL })
        @IsString({ message: ERROR_MESSAGES.EMAIL.MUST_BE_A_STRING })
        email: string;

        @IsString({ message: ERROR_MESSAGES.PASSWORD.MUST_BE_A_STRING })
        @MinLength(8, { message: ERROR_MESSAGES.PASSWORD.MUST_BE_LONGER })
        @MaxLength(64, { message: ERROR_MESSAGES.PASSWORD.MUST_BE_SHORTER })
        password: string;

        @IsOptional()
        @IsEnum(Role)
        role?: Role;
    }

    export type Response = IUser;
}
