import { IsUUID } from 'class-validator';
import { IUser } from '@jerky/interfaces';

export namespace UserDelete {
    export const topic = 'user.delete.command';

    export class Request {
        @IsUUID()
        uuid: string;
    }

    export type Response = IUser;
}
