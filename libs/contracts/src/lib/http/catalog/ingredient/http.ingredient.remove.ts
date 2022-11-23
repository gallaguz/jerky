import { IngredientRemove } from '../../../rmq';

export namespace HttpIngredientRemove {
    export class Request extends IngredientRemove.Request {}
    export type Response = IngredientRemove.Response;
}
