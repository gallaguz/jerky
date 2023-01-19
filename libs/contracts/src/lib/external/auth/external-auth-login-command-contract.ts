import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export namespace ExternalAuthLoginCommandContract {
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
        accessToken: string;
    }
}
