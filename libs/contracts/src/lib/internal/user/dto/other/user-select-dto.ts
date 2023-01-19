import { IsBoolean, IsOptional } from 'class-validator';

export class UserSelectDto {
    @IsOptional()
    @IsBoolean()
    createdAt?: boolean;

    @IsOptional()
    @IsBoolean()
    updatedAt?: boolean;

    @IsOptional()
    @IsBoolean()
    uuid?: boolean;

    @IsOptional()
    @IsBoolean()
    email?: boolean;

    @IsOptional()
    @IsBoolean()
    passwordHash?: boolean;

    @IsOptional()
    @IsBoolean()
    salt?: boolean;

    @IsOptional()
    @IsBoolean()
    role?: boolean;
}
