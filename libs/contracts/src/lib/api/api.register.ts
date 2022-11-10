import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { EMAIL, PASSWORD } from '@jerky/constants';

export namespace ApiRegister {
    export const topic = '';

    export class Request {
        @IsEmail({}, { message: EMAIL.MUST_BE_A_VALID_EMAIL })
        @IsString({ message: EMAIL.MUST_BE_A_STRING })
        email: string;

        @MaxLength(64, { message: PASSWORD.MUST_BE_SHORTER })
        @MinLength(8, { message: PASSWORD.MUST_BE_LONGER })
        @IsString({ message: PASSWORD.MUST_BE_A_STRING })
        password: string;
    }

    export class Response {
        accessToken: string;
    }
}
