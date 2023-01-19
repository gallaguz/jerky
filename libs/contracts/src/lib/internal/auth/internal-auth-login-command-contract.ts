import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export namespace InternalAuthLoginCommandContract {
    export const topic = 'auth.login.command';

    export class Request {
        @IsEmail()
        @IsString()
        email: string;

        @IsString()
        @MinLength(8)
        @MaxLength(64)
        password: string;
    }

    export class Response {
        refreshToken: string;
        accessToken: string;
    }
}
