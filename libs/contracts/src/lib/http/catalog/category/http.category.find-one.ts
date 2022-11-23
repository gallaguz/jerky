import { CategoryFindOne } from '../../../rmq';

export namespace HttpCategoryFindOne {
    export class Request extends CategoryFindOne.Request {}
    export type Response = CategoryFindOne.Response;
}
