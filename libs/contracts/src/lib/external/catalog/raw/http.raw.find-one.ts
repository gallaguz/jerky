import { InternalRawFindOneQueryContract } from '../../../internal';

export namespace HttpRawFindOne {
    export class Request extends InternalRawFindOneQueryContract.Request {}
    export type Response = InternalRawFindOneQueryContract.Response;
}
