import { InternalIngredientCreateCommandContract } from '../../../internal';

export namespace HttpIngredientCreate {
    export class Request extends InternalIngredientCreateCommandContract.Request {}
    export type Response = InternalIngredientCreateCommandContract.Response;
}
