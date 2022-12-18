import { CategoryFindFilteredQueryContract } from '../../../rmq';

export namespace HttpCategoryFindFiltered {
    export class Request extends CategoryFindFilteredQueryContract.Request {}
    export type Response = CategoryFindFilteredQueryContract.Response;
}
