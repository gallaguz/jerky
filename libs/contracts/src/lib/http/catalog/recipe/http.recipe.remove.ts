import { RecipeRemove } from '../../../rmq';

export namespace HttpRecipeRemove {
    export class Request extends RecipeRemove.Request {}
    export type Response = RecipeRemove.Response;
}
