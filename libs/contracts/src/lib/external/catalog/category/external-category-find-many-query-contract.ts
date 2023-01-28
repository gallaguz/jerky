import { InternalCategoryFindManyQueryContract } from '../../../internal';

export namespace ExternalCategoryFindManyQueryContract {
    export class Request extends InternalCategoryFindManyQueryContract.Request {}
    export type Response = InternalCategoryFindManyQueryContract.Response;
}
