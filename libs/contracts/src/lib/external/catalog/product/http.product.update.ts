import { InternalProductUpdateCommandContract } from '../../../internal';

export namespace HttpProductUpdate {
    export class Request extends InternalProductUpdateCommandContract.Request {}
    export type Response = InternalProductUpdateCommandContract.Response;
}
