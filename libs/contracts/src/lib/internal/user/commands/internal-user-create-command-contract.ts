import { User } from '@prisma/client/scripts/user-client';

import { UserCreateArgsDto } from '../dto';

export namespace InternalUserCreateCommandContract {
    export const topic = 'user.create.command';

    export class Request extends UserCreateArgsDto {}

    export type Response = User;
}
