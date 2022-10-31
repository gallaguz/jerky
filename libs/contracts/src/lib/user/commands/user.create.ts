import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role, User } from '@prisma/client';

export namespace UserCreate {
    export const topic = 'user.create.command';

    export class Request {
        @IsEmail()
        email: string;

        @IsString()
        passwordHash: string;

        @IsEnum(Role)
        role?: Role;
    }

    export type Response = User;
}
