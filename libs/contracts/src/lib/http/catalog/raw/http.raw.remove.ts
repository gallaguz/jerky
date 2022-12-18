import { RawRemoveCommandContract } from '../../../rmq';

export namespace HttpRawRemove {
    export class Request extends RawRemoveCommandContract.Request {}
    export type Response = RawRemoveCommandContract.Response;
}
