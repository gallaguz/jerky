import { CategoryFindFiltered } from '../../../rmq';

export namespace HttpCategoryFindFiltered {
    export class Request extends CategoryFindFiltered.Request {}
    export type Response = CategoryFindFiltered.Response;
}
