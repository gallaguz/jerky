import { UserUpdate } from '../../rmq';

export namespace HttpUserUpdate {
    export class Request extends UserUpdate.Request {}
    export type Response = UserUpdate.Response;
}
