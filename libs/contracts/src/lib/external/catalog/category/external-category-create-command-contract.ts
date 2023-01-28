import { InternalCategoryCreateCommandContract } from '../../../internal';

export namespace ExternalCategoryCreateCommandContract {
    export class Request extends InternalCategoryCreateCommandContract.Request {}
    export type Response = InternalCategoryCreateCommandContract.Response;
}
