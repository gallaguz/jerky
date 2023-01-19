import { User } from '@prisma/client/scripts/user-client';

import { UserFindManyArgsDto } from '../dto';

export namespace InternalUserFindManyQueryContract {
    export const topic = 'user.find-many.query';

    export class Request extends UserFindManyArgsDto {}

    export type Response = User[];
}
