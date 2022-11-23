import { ProductFindOne } from '../../../rmq';

export namespace HttpProductFindOne {
    export class Request extends ProductFindOne.Request {}
    export type Response = ProductFindOne.Response;
}
