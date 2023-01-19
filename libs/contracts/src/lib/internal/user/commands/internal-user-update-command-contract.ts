import { User } from '@prisma/client/scripts/user-client';

import { UserUpdateArgsDto } from '../dto';

export namespace InternalUserUpdateCommandContract {
    export const topic = 'user.update.command';

    export class Request extends UserUpdateArgsDto {}

    export type Response = User;
}
