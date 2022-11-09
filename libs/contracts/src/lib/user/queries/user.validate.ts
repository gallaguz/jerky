import { IsEmail, IsString, Length } from 'class-validator';
import { IUser } from '@jerky/interfaces';

export namespace UserValidate {
    export const topic = 'user.validate.query';

    export class Request {
        @IsEmail()
        email: string;

        @IsString()
        @Length(8, 64)
        password: string;
    }

    export type Response = IUser;
}
