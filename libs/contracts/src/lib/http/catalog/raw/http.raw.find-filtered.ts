import { RawFindFilteredQueryContract } from '../../../rmq';

export namespace HttpRawFindFiltered {
    export class Request extends RawFindFilteredQueryContract.Request {}
    export type Response = RawFindFilteredQueryContract.Response;
}
