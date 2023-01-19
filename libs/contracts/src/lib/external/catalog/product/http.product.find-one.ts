import { InternalProductFindOneQueryContract } from '../../../internal';

export namespace HttpProductFindOne {
    export class Request extends InternalProductFindOneQueryContract.Request {}
    export type Response = InternalProductFindOneQueryContract.Response;
}
