import { CategoryRemoveCommandContract } from '../../../rmq';

export namespace HttpCategoryRemove {
    export class Request extends CategoryRemoveCommandContract.Request {}
    export type Response = CategoryRemoveCommandContract.Response;
}
