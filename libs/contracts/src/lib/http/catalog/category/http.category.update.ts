import { CategoryUpdateCommandContract } from '../../../rmq';

export namespace HttpCategoryUpdate {
    export class Request extends CategoryUpdateCommandContract.Request {}
    export type Response = CategoryUpdateCommandContract.Response;
}
