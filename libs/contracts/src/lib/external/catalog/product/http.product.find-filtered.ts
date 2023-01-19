import { InternalProductFindManyQueryContract } from '../../../internal';

export namespace HttpProductFindFiltered {
    export class Request extends InternalProductFindManyQueryContract.Request {}
    export type Response = InternalProductFindManyQueryContract.Response;
}
