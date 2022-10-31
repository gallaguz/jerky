import { IsUUID } from 'class-validator';
import { User } from '@prisma/client';

export namespace UserDelete {
    export const topic = 'user.delete.command';

    export class Request {
        @IsUUID()
        uuid: string;
    }

    export type Response = User;
}
