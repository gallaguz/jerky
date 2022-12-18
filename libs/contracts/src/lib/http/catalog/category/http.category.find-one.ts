import { CategoryFindOneUuidQueryContract } from '../../../rmq';

export namespace HttpCategoryFindOne {
    export class Request extends CategoryFindOneUuidQueryContract.Request {}
    export type Response = CategoryFindOneUuidQueryContract.Response;
}
