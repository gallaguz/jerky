import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';

export namespace AuthRegister {
    export const topic = 'auth.register.command';

    export class Request {
        @IsEmail({}, { message: ERROR_MESSAGES.EMAIL.MUST_BE_A_VALID_EMAIL })
        @IsString({ message: ERROR_MESSAGES.EMAIL.MUST_BE_A_STRING })
        email: string;

        @MaxLength(64, { message: ERROR_MESSAGES.PASSWORD.MUST_BE_SHORTER })
        @MinLength(8, { message: ERROR_MESSAGES.PASSWORD.MUST_BE_LONGER })
        @IsString({ message: ERROR_MESSAGES.PASSWORD.MUST_BE_A_STRING })
        password: string;
    }

    export class Response {
        refreshToken: string;
        accessToken: string;
    }
}
