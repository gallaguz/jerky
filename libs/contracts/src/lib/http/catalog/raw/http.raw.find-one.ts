import { RawFindOneUuidQueryContract } from '../../../rmq';

export namespace HttpRawFindOne {
    export class Request extends RawFindOneUuidQueryContract.Request {}
    export type Response = RawFindOneUuidQueryContract.Response;
}
