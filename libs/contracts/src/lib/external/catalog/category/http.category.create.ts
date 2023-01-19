import { InternalCategoryCreateCommandContract } from '../../../internal';

export namespace HttpCategoryCreate {
    export class Request extends InternalCategoryCreateCommandContract.Request {}
    export type Response = InternalCategoryCreateCommandContract.Response;
}
