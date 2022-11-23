import { RawUpdate } from '../../../rmq';

export namespace HttpRawUpdate {
    export class Request extends RawUpdate.Request {}
    export type Response = RawUpdate.Response;
}
