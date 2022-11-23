import { IngredientFindFiltered } from '../../../rmq';

export namespace HttpIngredientFindFiltered {
    export class Request extends IngredientFindFiltered.Request {}
    export type Response = IngredientFindFiltered.Response;
}
