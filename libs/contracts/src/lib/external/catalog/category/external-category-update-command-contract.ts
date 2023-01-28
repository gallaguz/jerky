import { InternalCategoryUpdateCommandContract } from '../../../internal';

export namespace ExternalCategoryUpdateCommandContract {
    export class Request extends InternalCategoryUpdateCommandContract.Request {}
    export type Response = InternalCategoryUpdateCommandContract.Response;
}
