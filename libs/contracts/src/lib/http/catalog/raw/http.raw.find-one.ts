import { RawFindOne } from '../../../rmq';

export namespace HttpRawFindOne {
    export class Request extends RawFindOne.Request {}
    export type Response = RawFindOne.Response;
}
