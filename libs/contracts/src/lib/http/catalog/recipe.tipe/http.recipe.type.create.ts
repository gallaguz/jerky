import { RecipeTypeCreate } from '../../../rmq';

export namespace HttpRecipeTypeCreate {
    export class Request extends RecipeTypeCreate.Request {}
    export type Response = RecipeTypeCreate.Response;
}
