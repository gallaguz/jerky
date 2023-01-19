import { InternalIngredientRemoveCommandContract } from '../../../internal';

export namespace HttpIngredientRemove {
    export class Request extends InternalIngredientRemoveCommandContract.Request {}
    export type Response = InternalIngredientRemoveCommandContract.Response;
}
