import { InternalCategoryRemoveCommandContract } from '../../../internal';

export namespace HttpCategoryRemove {
    export class Request extends InternalCategoryRemoveCommandContract.Request {}
    export type Response = InternalCategoryRemoveCommandContract.Response;
}
