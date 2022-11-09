import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { IUser } from '@jerky/interfaces';
import { PASSWORD, UUID } from '@jerky/constants';

export namespace UserUpdatePassword {
    export const topic = 'user.update-password.command';

    export class Request {
        @IsUUID(4, { message: UUID.MUST_BE_A_VALID_UUID })
        @IsString({ message: UUID.MUST_BE_A_STRING })
        uuid: string;

        @IsString({ message: PASSWORD.MUST_BE_A_STRING })
        @MinLength(8, { message: PASSWORD.MUST_BE_LONGER })
        @MaxLength(64, { message: PASSWORD.MUST_BE_SHORTER })
        password: string;
    }

    export type Response = IUser;
}
