import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class UserWhereUniqueInputDto {
    @IsOptional()
    @IsUUID()
    uuid?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}
