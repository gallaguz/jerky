import { InternalCategoryRemoveCommandContract } from '../../../internal';

export namespace ExternalCategoryRemoveCommandContract {
    export class Request extends InternalCategoryRemoveCommandContract.Request {}
    export type Response = InternalCategoryRemoveCommandContract.Response;
}
