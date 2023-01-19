import { UserRole } from '@prisma/client/scripts/user-client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

import { InternalUserCreateCommandContract } from '../../internal';

export namespace ExternalUserCreateCommandContract {
    export class Request {
        @IsEmail()
        email: string;
        @IsString()
        password: string;
        @IsOptional()
        @IsEnum(UserRole)
        role?: UserRole;
    }
    export type Response = InternalUserCreateCommandContract.Response;
}
