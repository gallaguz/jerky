import { User } from '@prisma/client/scripts/user-client';
import { IsEmail, IsString, Length } from 'class-validator';

export namespace InternalUserValidateQueryContract {
    export const topic = 'user.validate.query';

    export class Request {
        @IsEmail()
        email: string;

        @IsString()
        @Length(8, 64)
        password: string;
    }

    export type Response = User;
}
