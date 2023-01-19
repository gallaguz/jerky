import { PASSWORD } from '@jerky/constants';
import { UserRole } from '@prisma/client/scripts/user-client';
import {
    IsEmail,
    IsEnum,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export namespace ExternalAuthRegisterCommandContract {
    export class Request {
        @IsEmail()
        @IsString()
        email: string;

        @MaxLength(PASSWORD.MAX)
        @MinLength(PASSWORD.MIN)
        @IsString()
        password: string;

        @IsEnum(UserRole)
        role: UserRole;
    }

    export class Response {
        accessToken: string;
    }
}
