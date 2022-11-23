import { IUser } from '@jerky/interfaces';
import { FindFiltered } from '../../../common';

export namespace UserFindFiltered {
    export const topic = 'user.find-filtered.query';

    export class Request extends FindFiltered {}

    export type Response = IUser[];
}
