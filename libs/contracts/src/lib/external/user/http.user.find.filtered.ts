import { InternalUserFindManyQueryContract } from '../../internal';

export namespace HttpUserFindFiltered {
    export class Request extends InternalUserFindManyQueryContract.Request {}
    export type Response = InternalUserFindManyQueryContract.Response;
}
