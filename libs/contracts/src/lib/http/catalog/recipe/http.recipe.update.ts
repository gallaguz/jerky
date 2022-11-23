import { RecipeUpdate } from '../../../rmq';

export namespace HttpRecipeUpdate {
    export class Request extends RecipeUpdate.Request {}
    export type Response = RecipeUpdate.Response;
}
