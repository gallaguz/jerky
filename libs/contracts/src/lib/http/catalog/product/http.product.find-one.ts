import { ProductFindOneUuid } from '../../../rmq';

export namespace HttpProductFindOne {
    export class Request extends ProductFindOneUuid.Request {}
    export type Response = ProductFindOneUuid.Response;
}
