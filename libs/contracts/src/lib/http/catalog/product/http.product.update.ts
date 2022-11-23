import { ProductUpdate } from '../../../rmq';

export namespace HttpProductUpdate {
    export class Request extends ProductUpdate.Request {}
    export type Response = ProductUpdate.Response;
}
