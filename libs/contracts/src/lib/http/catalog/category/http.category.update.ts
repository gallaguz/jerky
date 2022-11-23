import { CategoryUpdate } from '../../../rmq';

export namespace HttpCategoryUpdate {
    export class Request extends CategoryUpdate.Request {}
    export type Response = CategoryUpdate.Response;
}
