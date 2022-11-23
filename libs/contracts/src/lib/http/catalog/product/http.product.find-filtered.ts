import { ProductFindFiltered } from '../../../rmq';

export namespace HttpProductFindFiltered {
    export class Request extends ProductFindFiltered.Request {}
    export type Response = ProductFindFiltered.Response;
}
