import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { EMAIL, PASSWORD } from '@jerky/constants';

export namespace AuthLogin {
    export const topic = 'auth.login.command';

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
        refreshToken: string;
        accessToken: string;
    }
}
