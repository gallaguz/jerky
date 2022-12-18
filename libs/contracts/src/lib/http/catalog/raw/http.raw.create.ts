import { RawCreateCommandContract } from '../../../rmq';

export namespace HttpRawCreate {
    export class Request extends RawCreateCommandContract.Request {}
    export type Response = RawCreateCommandContract.Response;
}
