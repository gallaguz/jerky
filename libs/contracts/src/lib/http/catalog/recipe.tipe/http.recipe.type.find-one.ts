import { RecipeTypeFindOne } from '../../../rmq';

export namespace HttpRecipeTypeFindOne {
    export class Request extends RecipeTypeFindOne.Request {}
    export type Response = RecipeTypeFindOne.Response;
}
