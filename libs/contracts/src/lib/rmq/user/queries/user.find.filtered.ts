import { IUser } from '@jerky/interfaces';
import { FindManyArgs } from '../../../common';

export namespace UserFindFiltered {
    export const topic = 'user.find-filtered.query';

    export class Request extends FindManyArgs {}

    export type Response = IUser[];
}
