import { IsString, IsUUID } from 'class-validator';

export class UserUpdatePasswordHashDto {
    @IsUUID()
    uuid: string;

    @IsString()
    password: string;
}
