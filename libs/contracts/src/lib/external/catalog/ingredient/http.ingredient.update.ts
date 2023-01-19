import { InternalIngredientUpdateCommandContract } from '../../../internal';

export namespace HttpIngredientUpdate {
    export class Request extends InternalIngredientUpdateCommandContract.Request {}
    export type Response = InternalIngredientUpdateCommandContract.Response;
}
