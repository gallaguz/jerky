import { IsString, IsUUID, Length } from 'class-validator';

export class UserUpdatePasswordHashDto {
    @IsUUID()
    uuid: string;

    @IsString()
    @Length(8, 64)
    password: string;
}
