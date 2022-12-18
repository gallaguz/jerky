import { RecipeFindOneUuid } from '../../../rmq';

export namespace HttpRecipeFindOne {
    export class Request extends RecipeFindOneUuid.Request {}
    export type Response = RecipeFindOneUuid.Response;
}
