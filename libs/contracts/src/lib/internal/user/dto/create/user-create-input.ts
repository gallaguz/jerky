import { UserRole } from '@prisma/client/scripts/user-client';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class UserCreateInputDto {
    @IsEmail()
    email: string;

    @IsString()
    passwordHash: string;

    @IsString()
    salt: string;

    @IsEnum(UserRole)
    role: UserRole;
}
