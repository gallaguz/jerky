import { RawRemove } from '../../../rmq';

export namespace HttpRawRemove {
    export class Request extends RawRemove.Request {}
    export type Response = RawRemove.Response;
}
