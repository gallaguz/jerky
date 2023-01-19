import { InternalRecipeUpdateCommandContract } from '../../../internal';

export namespace HttpRecipeUpdate {
    export class Request extends InternalRecipeUpdateCommandContract.Request {}
    export type Response = InternalRecipeUpdateCommandContract.Response;
}
