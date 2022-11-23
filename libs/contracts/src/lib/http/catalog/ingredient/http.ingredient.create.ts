import { IngredientCreate } from '../../../rmq';

export namespace HttpIngredientCreate {
    export class Request extends IngredientCreate.Request {}
    export type Response = IngredientCreate.Response;
}
