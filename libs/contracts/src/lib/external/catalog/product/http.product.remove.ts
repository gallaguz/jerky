import { InternalProductRemoveCommandContract } from '../../../internal';

export namespace HttpProductRemove {
    export class Request extends InternalProductRemoveCommandContract.Request {}
    export type Response = InternalProductRemoveCommandContract.Response;
}
