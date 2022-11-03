import { IsEmail, IsUUID } from 'class-validator';
import { IUser } from '@jerky/interfaces';

export namespace UserUpdateEmail {
    export const topic = 'user.update-email.command';

    export class Request {
        @IsUUID()
        uuid: string;

        @IsEmail()
        email: string;
    }

    export type Response = IUser;
}
