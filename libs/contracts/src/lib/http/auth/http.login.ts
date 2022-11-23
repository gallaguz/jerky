import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ERROR_MESSAGES } from '@jerky/constants';

export namespace HttpLogin {
    import PASSWORD = ERROR_MESSAGES.PASSWORD;
    import EMAIL = ERROR_MESSAGES.EMAIL;

    export const topic = 'http.login.command';

    export class Request {
        @IsEmail({}, { message: EMAIL.MUST_BE_A_VALID_EMAIL })
        @IsString({ message: EMAIL.MUST_BE_A_STRING })
        email: string;

        @IsString({ message: PASSWORD.MUST_BE_A_STRING })
        @MinLength(8, { message: PASSWORD.MUST_BE_LONGER })
        @MaxLength(64, { message: PASSWORD.MUST_BE_SHORTER })
        password: string;
    }

    export class Response {
        accessToken: string;
    }
}
