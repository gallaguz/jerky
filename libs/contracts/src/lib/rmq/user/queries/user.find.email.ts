import { IsEmail } from 'class-validator';
import { IUser } from '@jerky/interfaces';

export namespace UserFindByEmail {
    export const topic = 'user.find-by-email.query';

    export class Request {
        @IsEmail()
        email: string;
    }

    export type Response = IUser;
}
