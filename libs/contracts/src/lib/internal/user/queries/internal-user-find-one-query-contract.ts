import { User } from '@prisma/client/scripts/user-client';

import { UserFindOneOrThrowArgsDto } from '../dto';

export namespace InternalUserFindOneQueryContract {
    export const topic = 'user.find-one.query';

    export class Request extends UserFindOneOrThrowArgsDto {}

    export type Response = User;
}
