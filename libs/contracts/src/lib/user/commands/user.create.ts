import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { IUser, Role } from '@jerky/interfaces';

export namespace UserCreate {
    export const topic = 'user.create.command';

    export class Request {
        @IsEmail()
        email: string;

        @IsString()
        password: string;

        @IsOptional()
        @IsEnum(Role)
        role?: Role;
    }

    export type Response = IUser;
}
