import { ProductCreate } from '../../../rmq';

export namespace HttpProductCreate {
    export class Request extends ProductCreate.Request {}
    export type Response = ProductCreate.Response;
}
