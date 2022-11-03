import { IsUUID } from 'class-validator';
import { IUser } from '@jerky/interfaces';

export namespace UserFindByUuid {
    export const topic = 'user.find-by-uuid.query';

    export class Request {
        @IsUUID(4, { message: `uuid must be a valid UUID` })
        uuid: string;
    }

    export type Response = IUser;
}
