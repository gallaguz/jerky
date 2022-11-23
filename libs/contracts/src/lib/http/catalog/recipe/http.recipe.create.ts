import { RecipeCreate } from '../../../rmq';

export namespace HttpRecipeCreate {
    export class Request extends RecipeCreate.Request {}
    export type Response = RecipeCreate.Response;
}
