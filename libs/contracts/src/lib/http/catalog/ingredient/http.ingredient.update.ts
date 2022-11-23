import { IngredientUpdate } from '../../../rmq';

export namespace HttpIngredientUpdate {
    export class Request extends IngredientUpdate.Request {}
    export type Response = IngredientUpdate.Response;
}
