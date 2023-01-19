import { InternalRecipeCreateCommandContract } from '../../../internal';

export namespace HttpRecipeCreate {
    export class Request extends InternalRecipeCreateCommandContract.Request {}
    export type Response = InternalRecipeCreateCommandContract.Response;
}
