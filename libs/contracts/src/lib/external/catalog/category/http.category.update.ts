import { InternalCategoryUpdateCommandContract } from '../../../internal';

export namespace HttpCategoryUpdate {
    export class Request extends InternalCategoryUpdateCommandContract.Request {}
    export type Response = InternalCategoryUpdateCommandContract.Response;
}
