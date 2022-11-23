import { IsString, IsUUID } from 'class-validator';
import { IUser } from '@jerky/interfaces';
import { ERROR_MESSAGES } from '@jerky/constants';

export namespace UserRemove {
    export const topic = 'user.remove.command';

    export class Request {
        @IsUUID(4, { message: ERROR_MESSAGES.UUID.MUST_BE_A_VALID_UUID })
        @IsString({ message: ERROR_MESSAGES.UUID.MUST_BE_A_STRING })
        uuid: string;
    }

    export type Response = IUser;
}
