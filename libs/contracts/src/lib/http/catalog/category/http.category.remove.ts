import { CategoryRemove } from '../../../rmq';

export namespace HttpCategoryRemove {
    export class Request extends CategoryRemove.Request {}
    export type Response = CategoryRemove.Response;
}
