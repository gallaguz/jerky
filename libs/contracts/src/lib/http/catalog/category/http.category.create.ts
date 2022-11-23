import { CategoryCreate } from '../../../rmq';

export namespace HttpCategoryCreate {
    export class Request extends CategoryCreate.Request {}
    export type Response = CategoryCreate.Response;
}
