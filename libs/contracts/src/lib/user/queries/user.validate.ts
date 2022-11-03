import { IsEmail, IsString } from 'class-validator';
import { IUser } from '@jerky/interfaces';

export namespace UserValidate {
    export const topic = 'user.validate.query';

    export class Request {
        @IsEmail()
        email: string;

        @IsString()
        password: string;
    }

    export type Response = IUser;
}
