import { ProductRemove } from '../../../rmq';

export namespace HttpProductRemove {
    export class Request extends ProductRemove.Request {}
    export type Response = ProductRemove.Response;
}
