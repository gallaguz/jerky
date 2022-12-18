import { RawUpdateCommandContract } from '../../../rmq';

export namespace HttpRawUpdate {
    export class Request extends RawUpdateCommandContract.Request {}
    export type Response = RawUpdateCommandContract.Response;
}
