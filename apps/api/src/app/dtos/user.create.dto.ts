import { IsEmail, IsString, Length } from 'class-validator';

export class UserCreateDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 64)
    password: string;
}
