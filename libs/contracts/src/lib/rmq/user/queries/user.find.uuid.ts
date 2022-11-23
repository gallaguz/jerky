import { IsUUID } from 'class-validator';
import { IUser } from '@jerky/interfaces';
import { ERROR_MESSAGES } from '@jerky/constants';

export namespace UserFindByUuid {
    export const topic = 'user.find-by-uuid.query';

    export class Request {
        @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
        uuid: string;
    }

    export type Response = IUser;
}
