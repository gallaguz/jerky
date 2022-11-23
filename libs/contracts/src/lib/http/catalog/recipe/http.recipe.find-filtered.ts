import { RecipeFindFiltered } from '../../../rmq';

export namespace HttpRecipeFindFiltered {
    export class Request extends RecipeFindFiltered.Request {}
    export type Response = RecipeFindFiltered.Response;
}
