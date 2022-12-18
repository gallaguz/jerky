import { CategoryCreateCommandContract } from '../../../rmq';

export namespace HttpCategoryCreate {
    export class Request extends CategoryCreateCommandContract.Request {}
    export type Response = CategoryCreateCommandContract.Response;
}
