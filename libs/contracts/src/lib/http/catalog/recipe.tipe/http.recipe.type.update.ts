import { RecipeTypeUpdate } from '../../../rmq';

export namespace HttpRecipeTypeUpdate {
    export class Request extends RecipeTypeUpdate.Request {}
    export type Response = RecipeTypeUpdate.Response;
}
