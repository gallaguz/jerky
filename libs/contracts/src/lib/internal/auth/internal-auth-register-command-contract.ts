import { UserRole } from '@prisma/client/scripts/user-client';
import {
    IsEmail,
    IsEnum,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export namespace InternalAuthRegisterCommandContract {
    export const topic = 'auth.register.command';

    export class Request {
        @IsEmail()
        @IsString()
        email: string;

        @MaxLength(64)
        @MinLength(8)
        @IsString()
        password: string;

        @IsEnum(UserRole)
        role: UserRole;
    }

    export class Response {
        refreshToken: string;
        accessToken: string;
    }
}
