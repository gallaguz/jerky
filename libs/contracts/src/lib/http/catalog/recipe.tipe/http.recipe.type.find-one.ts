import { RecipeTypeFindOneUuid } from '../../../rmq';

export namespace HttpRecipeTypeFindOne {
    export class Request extends RecipeTypeFindOneUuid.Request {}
    export type Response = RecipeTypeFindOneUuid.Response;
}
