import { RecipeFindOne } from '../../../rmq';

export namespace HttpRecipeFindOne {
    export class Request extends RecipeFindOne.Request {}
    export type Response = RecipeFindOne.Response;
}
