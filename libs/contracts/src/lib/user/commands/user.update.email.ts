import { IsEmail, IsUUID } from 'class-validator';
import { User } from '@prisma/client';

export namespace UserUpdateEmail {
    export const topic = 'user.update-email.command';

    export class Request {
        @IsUUID()
        uuid: string;

        @IsEmail()
        email: string;
    }

    export type Response = User;
}
