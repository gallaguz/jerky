import { RawFindFiltered } from '../../../rmq';

export namespace HttpRawFindFiltered {
    export class Request extends RawFindFiltered.Request {}
    export type Response = RawFindFiltered.Response;
}
