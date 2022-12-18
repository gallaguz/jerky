import { IngredientFindOneUuid } from '../../../rmq';

export namespace HttpIngredientFindOne {
    export class Request extends IngredientFindOneUuid.Request {}
    export type Response = IngredientFindOneUuid.Response;
}
