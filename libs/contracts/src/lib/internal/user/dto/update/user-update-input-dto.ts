import { UserRole } from '@prisma/client/scripts/user-client';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UserUpdateInputDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    updatedAt?: Date;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    passwordHash?: string;

    @IsOptional()
    @IsString()
    salt?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
