import { RecipeTypeRemove } from '../../../rmq';

export namespace HttpRecipeTypeRemove {
    export class Request extends RecipeTypeRemove.Request {}
    export type Response = RecipeTypeRemove.Response;
}
