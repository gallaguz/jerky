import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role, User } from '@prisma/client';

export namespace UserCreate {
    export const topic = 'user.create.command';

    export class Request {
        @IsEmail()
        email: string;

        @IsString()
        passwordHash: string;

        @IsOptional()
        @IsEnum(Role)
        role?: Role;
    }

    export type Response = User;
}
