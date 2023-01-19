import { User } from '@prisma/client/scripts/user-client';

import { UserDeleteArgsDto } from '../dto';

export namespace InternalUserRemoveCommandContract {
    export const topic = 'user.remove.command';

    export class Request extends UserDeleteArgsDto {}

    export type Response = User;
}
