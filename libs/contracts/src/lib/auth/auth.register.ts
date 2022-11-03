import { IsEmail, IsString } from 'class-validator';

export namespace AuthRegister {
    export const topic = 'auth.register.command';

    export class Request {
        @IsEmail()
        email: string;

        @IsString()
        password: string;
    }

    export class Response {
        refreshToken: string;
        accessToken: string;
    }
}
