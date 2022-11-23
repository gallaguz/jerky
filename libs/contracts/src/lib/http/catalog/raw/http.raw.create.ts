import { RawCreate } from '../../../rmq';

export namespace HttpRawCreate {
    export class Request extends RawCreate.Request {}
    export type Response = RawCreate.Response;
}
