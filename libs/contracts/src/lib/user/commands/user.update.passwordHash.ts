import { IsString, IsUUID } from 'class-validator';
import { User } from '@prisma/client';

export namespace UserUpdatePasswordHash {
    export const topic = 'user.update-password-hash.command';

    export class Request {
        @IsUUID()
        uuid: string;

        @IsString()
        passwordHash: string;
    }

    export type Response = User;
}
