import { IsEmail } from 'class-validator';
import { User } from '@prisma/client';

export namespace UserFindByEmail {
    export const topic = 'user.find-by-email.query';

    export class Request {
        @IsEmail()
        email: string;
    }

    export type Response = User;
}
