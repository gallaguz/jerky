import { InternalUserFindManyQueryContract } from '../../internal';

export namespace ExternalUserFindManyQueryContract {
    export class Request extends InternalUserFindManyQueryContract.Request {}
    export type Response = InternalUserFindManyQueryContract.Response;
}
