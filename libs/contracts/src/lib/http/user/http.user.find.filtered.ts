import { UserFindFiltered } from '../../rmq';

export namespace HttpUserFindFiltered {
    export class Request extends UserFindFiltered.Request {}
    export type Response = UserFindFiltered.Response;
}
