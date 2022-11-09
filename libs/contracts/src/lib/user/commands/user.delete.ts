import { IsString, IsUUID } from 'class-validator';
import { IUser } from '@jerky/interfaces';
import { UUID } from '@jerky/constants';

export namespace UserDelete {
    export const topic = 'user.delete.command';

    export class Request {
        @IsUUID(4, { message: UUID.MUST_BE_A_VALID_UUID })
        @IsString({ message: UUID.MUST_BE_A_STRING })
        uuid: string;
    }

    export type Response = IUser;
}
