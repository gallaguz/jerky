import { IngredientFindOne } from '../../../rmq';

export namespace HttpIngredientFindOne {
    export class Request extends IngredientFindOne.Request {}
    export type Response = IngredientFindOne.Response;
}
