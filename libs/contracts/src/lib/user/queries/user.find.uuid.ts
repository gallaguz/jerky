import { IsUUID } from 'class-validator';
import { User } from '@prisma/client';

export namespace UserFindByUuid {
    export const topic = 'user.find-by-uuid.query';

    export class Request {
        @IsUUID()
        uuid: string;
    }

    export type Response = User;
}
