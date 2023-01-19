import { InternalRawUpdateCommandContract } from '../../../internal';

export namespace HttpRawUpdate {
    export class Request extends InternalRawUpdateCommandContract.Request {}
    export type Response = InternalRawUpdateCommandContract.Response;
}
